from flask import Flask, request
import requests


def create_app():
    app = Flask(__name__)

    @app.route("/api/start-sync")
    def index():
        endpoint = "https://brahms-sync.onrender.com/api/sync"
        token = request.args.get("token")
        myobj = {'token': token}
        x = requests.post(endpoint, json=myobj)
        return x.text

    return app
