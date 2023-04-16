from __future__ import annotations
from flask import (Blueprint, request, copy_current_request_context)
import requests
from dotenv import load_dotenv
from . import scraper
from .models import Piece, Composer, Log
from . import db
import os
import threading
import datetime


load_dotenv()
TOKEN = os.environ["TOKEN"]
bp = Blueprint('api', __name__, url_prefix="/api")


def piece_exists(piece: Piece) -> bool:
    """checks if piece exists in database"""
    result = Piece.query.filter_by(
        title=piece.title,
        subtitle=piece.subtitle,
        composer=piece.composer
    ).all()
    return True if result else False


def composer_exists(composer: Composer) -> bool:
    """checks if composer exists in database"""
    result = Composer.query.filter_by(
        full_name=composer.full_name
    ).all()
    return True if result else False


def add_composer(composer: Composer):
    print(f"Adding {composer.full_name}")
    try:
        db.session.add(composer)
        db.session.commit()
    except Exception:
        db.session.rollback()
        raise


def add_piece(piece: Piece):
    print(f"Adding {piece.title} by {piece.composer}")
    try:
        db.session.add(piece)
        db.session.commit()
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


def update_database():
    new_pieces = 0
    new_composers = 0
    print("Updating database...")
    print("Getting number of pages")
    num_pages = scraper.get_num_pages()
    print(f"Current number of pages is {num_pages}")
    hour = int(datetime.datetime.now().hour)
    day = int(datetime.datetime.now().timetuple().tm_yday) % 10
    start = int(float(((day * 2) + (hour / 12)) % 20) / 20.0 * num_pages)
    end = int(float(((day * 2) + (hour / 12) + 1) % 20) / 20.0 * num_pages)
    print(f"Scraping {start} to {end}")

    for i in range(start, end+1):
        cur_page = i+1
        url = scraper.get_url(cur_page)
        print(f"Scraping page {cur_page}/({end}){num_pages}")
        try:
            with requests.get(url, timeout=10) as page:
                print("Page request successful.")
                print("Processing page...")
                pieces = scraper.process_page(page)
                for i, p in enumerate(pieces):
                    print(f"Processing piece {i+1}/{len(pieces)}")
                    piece = scraper.extract_piece(p)
                    composer = scraper.process_composer(piece.composer)
                    piece_exist = piece_exists(piece)
                    composer_exist = composer_exists(composer)
                    if not piece_exist:
                        new_pieces += 1
                        add_piece(piece)
                    if not composer_exist:
                        add_composer(composer)
                        new_composers += 1
                    print("\n")
                p.decompose()
        except Exception as e:
            print(f"An error occured on page {cur_page}")
            print(f"Error: \n {e}")
    add_log(new_composers, new_pieces)
    print("Database sync completed")
    db.session.close()


@bp.route("/sync", methods=["POST"])
def sync():
    """
    The endpoint that syncs the database.
    Receives a POST request with auth token in body.
    Updates the database using a thread so it does not block
    the response.
    """
    print(request.headers)
    data = request.get_json()

    if "token" not in data:
        return "No token in body found."

    if data["token"] != TOKEN:
        token = data["token"]
        return f"Incorrect token: {token}"

    @copy_current_request_context
    def update_wrapper():
        update_database()

    threading.Thread(target=update_wrapper).start()
    return "Authentification successful. Beginning database update.\n"


@bp.route("/echo", methods=["POST"])
def echo():
    print(request.headers)
    data = request.get_json()
    return data
