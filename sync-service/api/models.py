from . import db
import datetime


class Title(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    string = db.Column(db.String(200))


class Subtitle(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    string = db.Column(db.String(300))


class FullYear(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    string = db.Column(db.String(48))


class Composer(db.Model):
    id = db.Column(db.BigInteger, primary_key=True)
    string = db.Column(db.String(32))
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))


class Piece(db.Model):
    id = db.Column(db.BigInteger, primary_key=True, autoincrement=True)
    title = db.Column(db.BigInteger)
    subtitle = db.Column(db.BigInteger)
    year = db.Column(db.Integer)
    full_year = db.Column(db.BigInteger)
    composer = db.Column(db.BigInteger)
    duration = db.Column(db.Integer)


class Log(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    new_composers = db.Column(db.Integer)
    new_pieces = db.Column(db.Integer)
    timestamp = db.Column(db.TIMESTAMP, default=datetime.datetime.utcnow)
