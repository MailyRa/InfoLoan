from flask import (Flask, render_template, request, flash, session,                   redirect)
from model import connect_to_db

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    return render_template("homepage.html")


# @app.route("/loan_categories")
# def loan_categories():


# @app.route("/create_profile")
# def create_profile():


# @app.route("/login")
# def login():


# @app.route("/logout")
# def logout():


# @app.route("/loans")
# def loans():


# @app.route("/loan_information")
# def loan_information():


# @app.route("/user_profile")
# def user_profile():



# @app.route("/save_loans")
# def save_loans():



# @app.route("/compare_loans")
# def compare_loans():



# @app.route("/loan_website")
# def loan_website():

# @app.route("/")


if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)