from flask import Blueprint
from . import cache
from .models import Piece, Composer
from . import db

bp = Blueprint("count", __name__, url_prefix="/api/count")


@cache.cached(timeout=604800)
@bp.route("/composer")
def composers_count():
    count = db.session.query(Composer.id).count()
    return {'size': count}


@cache.cached(timeout=604800)
@bp.route("/piece")
def pieces_count():
    count = db.session.query(Piece.id).count()
    return {'size': count}
