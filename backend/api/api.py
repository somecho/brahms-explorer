from .models import Piece, Composer, Log, Title, Subtitle, FullYear
from flask import Blueprint, request
from sqlalchemy import or_, and_
from . import db


bp = Blueprint("api", __name__, url_prefix="/api/")


@bp.route("/pieces/count")
def pieces_count():
    keywords = process_keywords(request.args.get("keywords"))
    or_queries = [or_(Piece.title.contains(w),
                      Piece.subtitle.contains(w),
                      Piece.composer.contains(w),
                      Piece.year_full.contains(w)) for w in keywords]
    count = (Piece.query
             .join(Composer, Piece.composer == Composer.full_name)
             .filter(and_(*or_queries))
             .count())
    return {'size': count}


def process_keywords(keywords):
    k = keywords or ""
    keywords_array = k.split(",")
    return keywords_array


def process_ascending(str):
    if not str:
        return True
    return eval(str.capitalize())


map_order_by = {
    "title": Title.string,
    "lastName": Composer.last_name,
    "firstName": Composer.first_name,
    "year": Piece.year,
    "subtitle": Subtitle.string
}


@bp.route("/pieces", methods=["POST", "GET"])
def pieces():
    if request.method == "GET":
        limit = request.args.get("limit") or 100
        offset = request.args.get("offset") or 0
        keywords = process_keywords(request.args.get("keywords"))
        order_by = request.args.get("orderBy") or "title"
        ascending = process_ascending(request.args.get("ascending"))
        or_queries = [or_(Title.string.contains(w),
                          Subtitle.string.contains(w),
                          Composer.string.contains(w),
                          FullYear.string.contains(w)) for w in keywords]
        order = (map_order_by[order_by]
                 if ascending
                 else map_order_by[order_by].desc())
        results = (db.session.query(Title.string,
                                    Subtitle.string,
                                    Composer.string,
                                    FullYear.string)
                   .select_from(Piece)
                   .join(Composer, Piece.composer == Composer.id)
                   .join(Title, Piece.title == Title.id)
                   .join(Subtitle, Piece.subtitle == Subtitle.id)
                   .join(FullYear, Piece.full_year == FullYear.id)
                   .filter(and_(*or_queries))
                   .order_by(order)
                   .limit(limit)
                   .offset(offset)
                   .all())
        results = [dict(title=a[0],
                        subtitle=a[1],
                        composer=a[2],
                        year=a[3]) for a in results]
        return results


@bp.route("/last-updated")
def last_updated():
    result = Log.query.order_by(Log.timestamp.desc()).first()
    print(result.timestamp, result.new_composers, result.new_pieces)
    return {'timestamp': result.timestamp,
            'newComposers': result.new_composers,
            'newPieces': result.new_pieces}
