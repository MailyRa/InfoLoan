from db import loans as loans_db
from flask import jsonify, request, session


def loan_categories_json():
    categories = loans_db.get_category_loans()
   
    category_json = [{
        "category_id": category.category_loans_id,
        "category_name": category.category_name} 
        for category in categories
    ] 
    return jsonify(category_json)


def loans_json():
    category_id = int(request.args.get("category_id"))
    loans = loans_db.get_loans_by_category_id(category_id)
    loan_json = [
        {
            "loan_id": loan.loan_id,
            "loan_name": loan.loan_name,
            "loan_description": loan.loan_description,
            "loan_website": loan.loan_website,
            "loan_gov": loan.loan_gov,
            "loan_region": loan.loan_region,
            "loan_city": loan.loan_city,
            "loan_credit_union": loan.loan_credit_union,
            "loan_photo": loan.loan_photo

        } for loan in loans
    ]

    return jsonify(loan_json)


def save_loan_json():
    user_id = session['current_user']
    
    data = request.get_json()
    loan_id = data.get('loan_id')

    saved_loan = loans_db.save_loan_for_user(user_id, loan_id)

    if saved_loan == None:
        
        return jsonify({"Error": "Loan already Saved!"})

    return jsonify({"success": "Loan Saved!"})


def delete_loan_json():
    user_id = session['current_user']
    data = request.get_json()
    loan_id = data.get("loan_id")

    loans_db.delete_loan_for_user(user_id, loan_id)

    return jsonify({"delete": "Completed"})


def compare_loans():
    loan_ids = [int(loan_id) for loan_id in request.get_json()["loan_ids"]]
    loans = loans_db.get_loans_by_ids(loan_ids)
    loans_json = [
        {
            "loan_id": loan.loan_id,
            "loan_name": loan.loan_name,
            "loan_description": loan.loan_description,
            "loan_website": loan.loan_website,
            "loan_gov": loan.loan_gov,
            "loan_region": loan.loan_region,
            "loan_city": loan.loan_city,
            "loan_credit_union": loan.loan_credit_union,
            "loan_photo": loan.loan_photo

        } for loan in loans
    ]

    return jsonify(loans_json)
