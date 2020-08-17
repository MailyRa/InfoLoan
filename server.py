from flask import Flask, render_template, request, flash, session, redirect, json, jsonify
from model import connect_to_db, User
from datetime import datetime 

from jinja2 import StrictUndefined

import crud 

app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    return render_template("root.html")


@app.route("/loan_categories")
def loan_categories():
    return render_template("loan_categories.html")


@app.route("/loan_categories.json")
def loan_categories_json():
    categories = crud.get_category_loans()
   
    category_json = [
        category.category_name for category in categories
    ]
    return jsonify(category_json)


@app.route("/create_profile", methods=["GET"])
def create_profile():
    return render_template("profile.html")



@app.route("/create_user", methods=["POST"])
def create_user():
   
    fname = request.form.get('fname')
    lname = request.form.get('lname')
    dob = request.form.get('dob')
    address = request.form.get('address')
    credit_score = request.form.get('credit_score')
    email = request.form.get('email')
    password = request.form.get('password')

    user = crud.get_user_by_email(email)
    
    if user:
        flash('Email or password exists already, please log in')

        return redirect('/login')
    else:
        crud.create_user(fname, lname, dob, address, credit_score, email, password)
        flash('Account created! Please log in')
            
        return redirect('/login')


@app.route("/login", methods=['GET'])
def login():

    return render_template("login.html")



@app.route("/handle_login", methods=['POST'])
def handle_login():
    email = request.form.get('email')
    password = request.form.get('password')

    if not email or not password:
        flash("Invalid password and/or username try again!")
        return redirect('/login')

    user = crud.get_user_by_email(email)

    if user and user.password == password:
        session['current_user'] = user.user_id
        flash(f'Log in Sucess {email}')

        return redirect('/loan_categories')
    
    else:
        flash('Incorrect password and/or username try again!')
        return redirect('/login')



@app.route("/handle_logout", methods=['POST'])
def handle_logout():

    session.clear()

    return redirect('/')


@app.route("/car_loans")
def car_loans():
     return render_template("car_loans.html")


# @app.route("/car_loans.json")
# def loan_categories_json():
#     categories = crud.get_category_loans()
   
#     category_json = [
#         category.category_name for category in categories
#     ]
#     return jsonify(category_json)


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