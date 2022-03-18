import hashlib
import uuid

from db import (
    loans as loans_db,
    user as user_db
)
from flask import jsonify, request, session


def create_user():
    data = request.get_json()
    user_fname = data.get('user_fname')
    user_lname = data.get('user_lname')
    user_dob = data.get('user_dob')
    user_address = data.get('user_address')
    user_credit_score = data.get('user_credit_score')
    user_email = data.get('user_email')
    user_password = data.get('user_password')
    user = user_db.get_user_by_email(user_email)

    if user:
        return jsonify ({"error": "User already exists"})
    else:
        hashed_password = hashlib.sha512(user_password.encode('utf-8')).hexdigest()
        new_user = user_db.create_user(
            fname=user_fname, 
            lname=user_lname, 
            dob=user_dob, 
            address=user_address, 
            credit_score=user_credit_score, 
            email=user_email, 
            hashed_password=hashed_password
        )
        session['current_user'] = new_user.user_id   
        return jsonify({
            "fname": new_user.fname, 
            "lname": new_user.lname, 
            "dob": new_user.dob, 
            "address": new_user.address,
            "credit_score": new_user.credit_score, 
            "email": new_user.email, 
        })


def user_profile():
    user_id = session['current_user']
    
    user = user_db.get_user_by_id(user_id)

    users_loans = loans_db.get_user_loans_by_user(user_id)

    user_json = {
        "fname": user.fname,
        "lname": user.lname,
        "dob": user.dob.strftime("%m/%d/%Y"),
        "address": user.address,
        "credit_score": user.credit_score,
        "email": user.email,
        "loans": [
            {
                "loan_id": loan[1].loan_id,
                "loan_name": loan[1].loan_name,
                "loan_description": loan[1].loan_description,
                "loan_website": loan[1].loan_website,
                "loan_gov": loan[1].loan_gov,
                "loan_region": loan[1].loan_region,
                "loan_city": loan[1].loan_city,
                "loan_credit_union": loan[1].loan_credit_union,
                "loan_photo": loan[1].loan_photo
            } for loan in users_loans
        ]
    }
    return jsonify(user_json)
