import hashlib
import uuid

from db import user as user_db
from flask import jsonify, request, session


def handle_login():
    data = request.get_json()
    user_email = data.get('user_email')
    user_password = data.get('user_password')
    user = user_db.get_user_by_email(user_email)
    hashed_password = hashlib.sha512(user_password.encode('utf-8')).hexdigest()

    if user and user.password == hashed_password:
        session['current_user'] = user.user_id   
        return jsonify({"user_email": user_email})
    else:
        return jsonify({"error": "Incorrect Password or Username"})


def handle_logout():
    session.clear()
    return jsonify({"success": True})
