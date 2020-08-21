from flask import Flask, render_template, request, flash, session, redirect, json, jsonify
from model import connect_to_db, User
from datetime import datetime 

from jinja2 import StrictUndefined

import crud 

app = Flask(__name__)
app.secret_key = 'dev'
app.jinja_env.undefined = StrictUndefined

@app.route('/', defaults={'path':''})
@app.route('/<path:path>')
def homepage(path):
    return render_template("root.html")


@app.route("/loan_categories.json")
def loan_categories_json():
    categories = crud.get_category_loans()
   
    category_json = [
        {
            "category_id": category.category_loans_id,
            "category_name": category.category_name 
        } for category in categories
    ] 
    return jsonify(category_json)


@app.route("/car_loans.json", methods=['GET'])
def loans_json():

    category_id = int(request.args.get("category_id"))
    
    loans = crud.get_loans_by_category_id(category_id)

    loan_json = [
        {
            "loan_id": loan.loan_id,
            "loan_name": loan.loan_name,
            "loan_description": loan.loan_description,
            "loan_website": loan.loan_website

        } for loan in loans
    ]

    return jsonify(loan_json)



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


@app.route("/save_loan.json", methods=['POST'])
def save_loan_json():

    user_id = session['current_user']
    
    data = request.get_json()
    loan_id = data.get('loan_id')

    crud.save_loan_for_user(user_id, loan_id)

    return jsonify({"success": "Loan Saved!"})


@app.route("/user_profile.json", methods=['POST'])
def user_profile():
    user_id = session['current_user']
    user = crud.get_user_by_id(user_id)

    users_loans = crud.get_user_loans_by_user(user_id)

    user_json = {
        "fname": user.fname,
        "lname": user.lname,
        "dob": user.dob,
        "address": user.address,
        "credit_score": user.credit_score,
        "email": user.address,
        "loans": [
            {
                "loan_name": loan[1].loan_name,
                "loan_description": loan[1].loan_description,
                "loan_website": loan[1].loan_website
            } for loan in users_loans
        ]
    }
    return jsonify(user_json)




@app.route("/handle_logout", methods=['POST'])
def handle_logout():

    session.clear()

    return jsonify({"success": True})




# @app.route("/compare_loans")
# def compare_loans():



if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='0.0.0.0', debug=True)