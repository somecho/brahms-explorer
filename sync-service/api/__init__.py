from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()
HOST = os.environ['HOST']
DATABASE = os.environ['DATABASE']
USERNAME = os.environ['USERNAME']
PASSWORD = os.environ['PASSWORD']
database_uri = f"mysql://{USERNAME}:{PASSWORD}@{HOST}/{DATABASE}?ssl_ca=/etc/ssl/certs/ca-certificates.crt"


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = database_uri

    db.init_app(app)

    from . import models
    with app.app_context():
        db.create_all()

    from . import sync
    app.register_blueprint(sync.bp)

    def clean_up(e=None):
        print("cleaning up...")
        db.session.close()

    app.teardown_appcontext(clean_up)

    return app
