import os

from api import auth as auth_api, loans as loans_api, user as user_api
from datetime import datetime 
from db import connect_to_db
from flask import Flask, render_template, request, flash, session, redirect, json, jsonify


def create_app():
    app = Flask(__name__, template_folder='../templates', static_folder='../static')
    app.secret_key = 'dev'
    return app

app = create_app()

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def homepage(path):
    return render_template("root.html")

@app.route("/handle_login", methods=['POST'])
def handle_login():
    return auth_api.handle_login()

@app.route("/handle_logout", methods=['POST'])
def handle_logout():
    return auth_api.handle_logout()

@app.route("/loan_categories.json")
def loan_categories_json():
    return loans_api.loan_categories_json()

@app.route("/loans.json", methods=['GET'])
def loans_json():
    return loans_api.loans_json()

@app.route("/save_loan.json", methods=['POST'])
def save_loan_json():
    return loans_api.save_loan_json()

@app.route("/delete_loan.json", methods=['POST'])
def delete_loan_json():
    return loans_api.delete_loan_json()

@app.route("/compare_loans.json", methods=['POST'])
def compare_loans():
    return loans_api.compare_loans()

@app.route("/create_user", methods=['POST'])
def create_user(): 
    return user_api.create_user()

@app.route("/user_profile.json", methods=['GET'])
def user_profile():
    return user_api.user_profile()

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0')
