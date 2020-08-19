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


@app.route("/loan_categories.json")
def loan_categories_json():
    categories = crud.get_category_loans()
   
    category_json = [
        category.category_name for category in categories
    ]
    return jsonify(category_json)


@app.route("/car_loans.json")
def car_loans_json():
    
    car_loan = crud.get_category_by_name

    car_loans_json= [
        car_loan.category_name for car_loan in car_loan
    ]

    return jsonify(car_loans_json)




@app.route("/create_user", methods=['POST'])
def create_user():
   
    data = request.get_json()

    user_fname = data.get('user_fname')
    user_lname = data.get('user_lname')
    user_dob = data.get('user_dob')
    user_address = data.get('user_address')
    user_credit_score = data.get('user_credit_score')
    user_email = data.get('user_email')
    user_password = data.get('user_password')

    user = crud.get_user_by_email(user_email)

    if user:
        return jsonify ({"error": "User already exists"})
        
    else: 
        new_user = crud.create_user(user_fname, user_lname, user_dob, user_address, user_credit_score, user_email, user_password)

        return jsonify({
            "f_name": new_user.fname, 
            "lname": new_user.lname, 
            "dob": new_user.dob, 
            "address": new_user.address,
            "credit_score": new_user.credit_score, 
            "email": new_user.email, 
        })
        

@app.route("/handle_login", methods=['POST'])
def handle_login():

    data = request.get_json()

    user_email = data.get('user_email')
    user_password = data.get('user_password')

    user = crud.get_user_by_email(user_email)

    if user and user.password == user_password:
        session['current_user'] = user.user_id
    
        return jsonify({"user_email": user_email})
    else:
        return jsonify ({"error": "Incorrect Password or Username"})



@app.route("/handle_logout", methods=['POST'])
def handle_logout():

    session.clear()

    return redirect('/')






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