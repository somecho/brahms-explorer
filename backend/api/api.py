from .models import Piece, Composer, Log, Title, Subtitle, FullYear
from flask import Blueprint, request
from sqlalchemy import or_, and_, func
from . import db
from . import cache
import requests
import os


bp = Blueprint("api", __name__, url_prefix="/api/")


def get_admin_list():
    ADMINS = os.environ['ADMINS'].split(",")
    return ADMINS


@bp.route("/handshake")
def handshake():
    """Sometimes the webservice has to go through a cold startup.
    Apps should call this endpoint at the beginning to verify
    connection."""
    return {"connected": True}


@cache.cached(timeout=604800)
@bp.route("/isAdmin", methods=["POST"])
def is_admin():
    content = request.json
    if "accessToken" not in content.keys():
        return "", "400 Missing 'accessToken' in body"
    if content["accessToken"] == "":
        return "", "400 'accessToken' is an empty string"
    access_token = content["accessToken"]
    try:
        url = f"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={access_token}"
        user = requests.get(url)
        if user.json()["email"] not in get_admin_list():
            return {"isAdmin": False}, "400 not an admin"
        return {"isAdmin": True}
    except Exception:
        print("Failed request")


@cache.cached(timeout=604800)
@bp.route("/composers/count")
def composers_count():
    count = db.session.query(Composer.id).count()
    return {'size': count}


@cache.cached(timeout=604800)
@bp.route("/pieces/count")
def pieces_count():
    keywords = process_keywords(request.args.get("keywords"))
    or_queries = [or_(Title.string.contains(w),
                      Subtitle.string.contains(w),
                      Composer.string.contains(w),
                      FullYear.string.contains(w)) for w in keywords]
    count = (Piece.query
             .join(Composer, Piece.composer == Composer.id)
             .join(Title, Piece.title == Title.id)
             .join(Subtitle, Piece.subtitle == Subtitle.id)
             .join(FullYear, Piece.full_year == FullYear.id)
             .filter(and_(*or_queries))
             .count())
    return {'size': count}


def process_keywords(keywords):
    if keywords:
        k = keywords or ""
        keywords_array = k.split(",")
        return keywords_array
    return []


def process_ascending(str):
    if not str:
        return True
    return eval(str.capitalize())


def process_count(str):
    if not str:
        return False
    return eval(str.capitalize())


map_order_by = {
    "title": Title.string,
    "lastName": Composer.last_name,
    "firstName": Composer.first_name,
    "year": Piece.year,
    "subtitle": Subtitle.string
}


@cache.cached(timeout=604800, query_string=True)
@bp.route("/pieces", methods=["POST", "GET"])
def pieces():
    if request.method == "GET":
        limit = request.args.get("limit") or 10
        offset = request.args.get("offset") or 0
        count = process_count(request.args.get("count"))
        keywords = process_keywords(request.args.get("keywords"))
        order_by = request.args.get("orderBy") or "title"
        ascending = process_ascending(request.args.get("ascending"))
        or_queries = [or_(Title.string.match(w),
                          Subtitle.string.match(w),
                          Composer.string.match(w),
                          FullYear.string.match(w)) for w in keywords]
        order = (map_order_by[order_by]
                 if ascending
                 else map_order_by[order_by].desc())
        query = (db.session.query(Title.string,
                                  Subtitle.string,
                                  Composer.string,
                                  FullYear.string,
                                  Piece.duration,
                                  Piece.id)
                 .select_from(Piece)
                 .join(Composer, Piece.composer == Composer.id)
                 .join(Title, Piece.title == Title.id)
                 .join(Subtitle, Piece.subtitle == Subtitle.id)
                 .join(FullYear, Piece.full_year == FullYear.id))
        if keywords:
            query = query.filter(and_(*or_queries))
        query = (query
                 .order_by(order)
                 .limit(limit)
                 .offset(offset))
        results = [dict(title=a[0],
                        subtitle=a[1],
                        composer=a[2],
                        year=a[3],
                        duration=a[4],
                        id=a[5]) for a in query.all()]
        if count:
            total_count = query.with_entities(func.count(Piece.id)).scalar()
            return {"results": results, "count": total_count}
        return {"results": results}


@cache.cached(timeout=604800)
@bp.route("/last-updated")
def last_updated():
    result = Log.query.order_by(Log.timestamp.desc()).first()
    print(result.timestamp, result.new_composers, result.new_pieces)
    return {'timestamp': result.timestamp,
            'newComposers': result.new_composers,
            'newPieces': result.new_pieces}
