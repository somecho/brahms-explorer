from .models import Piece, Composer, Log, Title, Subtitle, FullYear
from flask import Blueprint, request
from sqlalchemy import or_, and_, func
from . import db
from . import cache
from .admin import authorized
from . import add


bp = Blueprint("api", __name__, url_prefix="/api/")


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


@bp.route("/piece/add", methods=["POST"])
def add_piece():
    body = request.json;
    title = body["title"] or ""
    composer = body["composer"] or ""
    if title == "" and composer == "":
        return "","400 title or composer is empty"
    subtitle = body["subtitle"] or ""
    full_year = body["year"] or ""
    year = int(full_year[:4]) if full_year else None
    composer = add.process_composer(composer)
    piece = {
        "title": title,
        "composer": composer["full_name"],
        "subtitle": subtitle,
        "full_year": full_year,
        "year": year,
        "duration": 0
        }
    composer = {
        "first_name":composer["first_name"],
        "last_name":composer["last_name"],
        "full_name":composer["full_name"]
        }    
    if not add.piece_exists(piece):
        add.add_piece(piece)

    if not add.composer_exists(composer):
        add.add_composer(composer)

    return f"{title} added to the database"

@bp.route("/piece/<id>", methods=["DELETE","PUT"])
def delete_piece(id):
    # check for authorization
    if not authorized(request.json["accessToken"]):
        return "", "400 not authorized"

    # update method
    if request.method == "PUT":
        print("beginning update request")
        piece = Piece.query.get(id)
        if not piece:
            return "", f"400 piece with {id} not found"
        print("piece with id found")
        title = request.json["title"] or ""
        if title == "":
            return "", f"400 title field cannot be empty"
        composer = request.json["composer"] or ""
        if composer == "":
            return "", f"400 composer field cannot be empty"
        subtitle = request.json["subtitle"] or ""
        full_year = request.json["year"] or ""

        # hash the strings
        h_title = add.hash_string(title)
        h_subtitle = add.hash_string(subtitle)
        h_composer = add.hash_string(composer)
        h_full_year = add.hash_string(full_year)

        # update piece
        piece.title = h_title
        piece.subtitle = h_subtitle
        piece.full_year = h_full_year
        piece.year =  int(full_year[:4]) if full_year else None
        piece.composer = h_composer
        db.session.commit()

        # update other tables by checking if they exist
        if not Title.query.get(h_title):
            db.session.add(Title(
                id=h_title,
                string=title))
        s_composer = add.process_composer(composer)

        if not Composer.query.get(h_composer):
            db.session.add(Composer(
                id=h_composer,
                string=s_composer["full_name"],
                first_name=s_composer["first_name"],
                last_name = s_composer["last_name"]))

        if not Subtitle.query.get(h_subtitle):
            db.session.add(Subtitle(
                id=h_subtitle,
                string=subtitle))

        if not FullYear.query.get(h_full_year):
            db.session.add(FullYear(
                id=h_full_year,
                string=full_year))

        db.session.commit()
        return "", "200 successfully updated"

    # delete method
    if request.method == "DELETE":
        try:
            db.session.query(Piece).filter(Piece.id == id).delete()
            db.session.commit()
            return "", "204 successfully deleted"
        except Exception as e:
            print(e)
            return "", "400 delete failed"


@cache.cached(timeout=604800, query_string=True)
@bp.route("/pieces", methods=["GET"])
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
