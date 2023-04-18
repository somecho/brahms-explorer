from . import db


class Piece(db.Model):
    __table__ = db.Model.metadata.tables["piece"]


class Composer(db.Model):
    __table__ = db.Model.metadata.tables["composer"]


class Log(db.Model):
    __table__ = db.Model.metadata.tables["log"]


class Title(db.Model):
    __table__ = db.Model.metadata.tables["title"]


class Subtitle(db.Model):
    __table__ = db.Model.metadata.tables["subtitle"]


class FullYear(db.Model):
    __table__ = db.Model.metadata.tables["full_year"]
