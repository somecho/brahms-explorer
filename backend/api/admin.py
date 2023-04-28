from flask import Blueprint, request
from . import cache
import requests
import os

bp = Blueprint("admin", __name__, url_prefix="/api")


def get_admin_list():
    ADMINS = os.environ['ADMINS'].split(",")
    return ADMINS


def authorized(access_token):
    url = f"https://www.googleapis.com/oauth2/v3/tokeninfo?access_token={access_token}"
    user = requests.get(url)
    if user.json()["email"] not in get_admin_list():
        return False
    return True


@cache.cached(timeout=604800)
@bp.route("/isAdmin", methods=["POST"])
def is_admin():
    content = request.json
    if "accessToken" not in content.keys():
        return "", "400 Missing 'accessToken' in body"
    if content["accessToken"] == "":
        return "", "400 'accessToken' is an empty string"
    access_token = content["accessToken"]
    try:
        if not authorized(access_token):
            return {"isAdmin": False}, "400 not an admin"
        return {"isAdmin": True}
    except Exception as e:
        print(e)
