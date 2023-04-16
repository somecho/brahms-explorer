from . import db


class Piece(db.Model):
    __table__ = db.Model.metadata.tables["pieces"]


class Composer(db.Model):
    __table__ = db.Model.metadata.tables["composers"]

class Log(db.Model):
    __table__ = db.Model.metadata.tables["logs"]
