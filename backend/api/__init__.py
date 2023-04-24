from dotenv import load_dotenv
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_caching import Cache
import os

load_dotenv()
HOST = os.environ['HOST']
DATABASE = os.environ['DATABASE']
USERNAME = os.environ['USERNAME']
PASSWORD = os.environ['PASSWORD']
CERT = "/etc/ssl/certs/ca-certificates.crt"
database_uri = f"mysql://{USERNAME}:{PASSWORD}@{HOST}/{DATABASE}?ssl_ca={CERT}"

db: SQLAlchemy = SQLAlchemy()
cache = Cache(config={'CACHE_TYPE': 'SimpleCache',
                      'CACHE_DEFAULT_TIMEOUT': 300})


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
    app.config['JSON_AS_ASCII'] = False
    cache.init_app(app)

    db.init_app(app)
    with app.app_context():
        db.Model.metadata.reflect(db.engine)

    from . import api
    app.register_blueprint(api.bp)

    return app
