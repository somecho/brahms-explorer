from .models import Piece, Composer, Log
from flask import Blueprint, request
from sqlalchemy import or_, and_

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
    "title": Piece.title,
    "lastName": Composer.last_name,
    "firstName": Composer.first_name,
    "year": Piece.year_short,
    "subtitle": Piece.subtitle
}


@bp.route("/pieces", methods=["POST", "GET"])
def pieces():
    if request.method == "GET":
        limit = request.args.get("limit") or 100
        offset = request.args.get("offset") or 0
        keywords = process_keywords(request.args.get("keywords"))
        order_by = request.args.get("orderBy") or "title"
        ascending = process_ascending(request.args.get("ascending"))
        or_queries = [or_(Piece.title.contains(w),
                          Piece.subtitle.contains(w),
                          Piece.composer.contains(w),
                          Piece.year_full.contains(w)) for w in keywords]
        order = (map_order_by[order_by]
                 if ascending
                 else map_order_by[order_by].desc())
        results = (Piece.query
                   .join(Composer, Piece.composer == Composer.full_name)
                   .filter(and_(*or_queries))
                   .order_by(order)
                   .limit(limit)
                   .offset(offset)
                   .all())
        results = [dict(title=a.title,
                        subtitle=a.subtitle,
                        composer=a.composer,
                        year=a.year_full) for a in results]
        return results


@bp.route("/last-updated")
def last_updated():
    result = Log.query.order_by(Log.timestamp.desc()).first()
    print(result.timestamp, result.new_composers, result.new_pieces)
    return {'timestamp': result.timestamp,
            'newComposers': result.new_composers,
            'newPieces': result.new_pieces}
