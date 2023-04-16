from . import db
import datetime


class Composer(db.Model):
    __tablename__ = "composers"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    full_name = db.Column(db.String(128), nullable=False)
    first_name = db.Column(db.String(32), nullable=False)
    middle_name = db.Column(db.String(56))
    last_name = db.Column(db.String(32), nullable=False)


class Piece(db.Model):
    __tablename__ = "pieces"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(200))
    subtitle = db.Column(db.String(300))
    composer = db.Column(db.String(128))
    year_short = db.Column(db.Integer)
    year_full = db.Column(db.String(32))
    duration = db.Column(db.Integer)


class Log(db.Model):
    __tablename__ = "logs"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    new_composers = db.Column(db.Integer)
    new_pieces = db.Column(db.Integer)
    timestamp = db.Column(db.TIMESTAMP, default=datetime.datetime.utcnow)
