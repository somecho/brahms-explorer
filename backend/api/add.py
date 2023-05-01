from __future__ import annotations
from .models import Title, Subtitle, Composer, Piece, FullYear
from . import db
from hashlib import md5

def hash_string(s: str) -> int:
    return int(md5(s.encode("UTF-8")).hexdigest(), 16) % 10**8


def piece_exists(piece: dict) -> bool:
    """checks if piece exists in database"""
    title_exist = (db.session
                   .query(Title.id)
                   .filter_by(id=hash_string(piece["title"]))
                   .first())
    subtitle_exist = (db.session
                      .query(Subtitle.id)
                      .filter_by(id=hash_string(piece["subtitle"]))
                      .first())
    return True if title_exist and subtitle_exist else False


def composer_exists(composer: dict) -> bool:
    """checks if composer exists in database"""
    result = (db.session
              .query(Composer.id)
              .filter_by(id=hash_string(composer["full_name"]))
              .first())
    return True if result else False


def process_composer(composer: str) -> dict:
    return {
        'full_name': composer,
        'first_name': composer.split(' ')[0],
        'last_name': composer.split(' ')[-1],
    }


def add_composer(composer: dict):
    full_name = composer["full_name"]
    print(f"Adding {full_name}")
    try:
        db.session.add(Composer(
            id=hash_string(full_name),
            string=full_name,
            first_name=composer["first_name"],
            last_name=composer["last_name"],
        ))
        db.session.commit()
    except Exception:
        db.session.rollback()


def add_piece(piece: dict):
    title = piece["title"]
    hash_title = hash_string(title)
    composer = piece["composer"]
    subtitle = piece["subtitle"]
    hash_sub = hash_string(subtitle)
    full_year = piece["full_year"]
    hash_year = hash_string(full_year)
    print(f"Adding {title} by {composer}")
    try:
        db.session.add(Piece(
            title=hash_title,
            subtitle=hash_sub,
            year=piece["year"],
            full_year=hash_year,
            composer=hash_string(composer),
            duration=piece["duration"]
        ))
        if not Title.query.filter_by(id=hash_title).count():
            db.session.add(Title(
                id=hash_title,
                string=title
            ))

        if not Subtitle.query.filter_by(id=hash_sub).count():
            db.session.add(Subtitle(
                id=hash_sub,
                string=subtitle
            ))

        if not FullYear.query.filter_by(id=hash_year).count():
            db.session.add(FullYear(
                id=hash_year,
                string=full_year
            ))
        db.session.commit()
    except Exception:
        db.session.rollback()


