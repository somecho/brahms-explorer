from __future__ import annotations
from flask import (Blueprint, request, copy_current_request_context)
import requests
from . import scraper
from .models import Title, Subtitle, Composer, Log, Piece, FullYear
from . import db
from hashlib import md5
import click


bp = Blueprint('api', __name__, url_prefix="/api")


def hash_string(s: str) -> int:
    return int(md5(s.encode("UTF-8")).hexdigest(), 16) % 10 ** 8


def piece_exists(piece: dict) -> bool:
    """checks if piece exists in database"""
    title_exist = (db.session
                   .query(Title.id)
                   .filter_by(id=hash_string(piece["title"]))
                   .count())
    subtitle_exist = (db.session
                      .query(Subtitle.id)
                      .filter_by(id=hash_string(piece["subtitle"]))
                      .count())
    return True if title_exist and subtitle_exist else False


def composer_exists(composer: dict) -> bool:
    """checks if composer exists in database"""
    result = (db.session
              .query(Composer.id)
              .filter_by(id=hash_string(composer["full_name"]))
              .count())
    return True if result else False


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
    except Exception:
        db.session.rollback()
        raise


def add_piece(piece: dict):
    title = piece["title"]
    composer = piece["composer"]
    subtitle = piece["subtitle"]
    full_year = piece["full_year"]
    print(f"Adding {title} by {composer}")
    try:
        db.session.add(Piece(
            title=hash_string(title),
            subtitle=hash_string(subtitle),
            year=piece["year"],
            full_year=hash_string(full_year),
            composer=hash_string(composer),
            duration=piece["duration"]
        ))
        if not Title.query.filter_by(id=hash_string(title)).count():
            db.session.add(Title(
                id=hash_string(title),
                string=title
            )),

        if not Subtitle.query.filter_by(id=hash_string(subtitle)).count():
            db.session.add(Subtitle(
                id=hash_string(subtitle),
                string=subtitle
            ))

        if not FullYear.query.filter_by(id=hash_string(full_year)).count():
            db.session.add(FullYear(
                id=hash_string(full_year),
                string=full_year
            ))

    except Exception:
        db.session.rollback()
        raise


def add_log(new_composers, new_pieces):
    try:
        db.session.add(Log(new_composers=new_composers,
                       new_pieces=new_pieces))
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise

def loading_bar(a:int,b:int)->str:
    bar = "|"
    for i in range(b):
        if i < a+1:
            bar += "="
        else:
            bar += "."
    bar += "|"
    return bar

@click.command('sync-db')
def update_database():
    new_pieces = 0
    new_composers = 0
    print("Updating database...")
    print("Getting number of pages")
    num_pages = scraper.get_num_pages()
    print(f"Current number of pages is {num_pages}\n")

    for i in range(num_pages):
        cur_page = i+1
        url = scraper.get_url(cur_page)
        print(f"Scraping page {cur_page} of {num_pages}")
        try:
            with requests.get(url, timeout=10) as page:
                print("Page request successful.")
                print("Processing page...\n")
                pieces = scraper.process_page(page)
                for i, p in enumerate(pieces):
                    print("\r", end="")
                    print(f"Processing piece {i+1}/{len(pieces)} {loading_bar(i,len(pieces))}", end="")
                    piece = scraper.extract_piece(p)
                    composer = scraper.process_composer(piece["composer"])
                    piece_exist = piece_exists(piece)
                    composer_exist = composer_exists(composer)
                    if not piece_exist:
                        new_pieces += 1
                        add_piece(piece)
                    if not composer_exist:
                        add_composer(composer)
                        new_composers += 1
                db.session.commit()
                p.decompose()
                print("\n\n")
        except Exception as e:
            print(f"An error occured on page {cur_page}")
            print(f"Error: \n {e}")
    add_log(new_composers, new_pieces)
    print("Database sync completed")
    db.session.close()
