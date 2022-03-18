import os
import json
from random import choice, randint

from db import (
    db,
    connect_to_db,
    loans as loans_db
)
import server

os.system('dropdb loans')
os.system('createdb loans')

connect_to_db(server.app)

with open('seed_data/loan.json') as f:
    loan_data = json.loads(f.read())

for category_json in loan_data:
    category = loans_db.create_category_loan(category_json["category_name"])
    loan_data_list = category_json["loans"]
    for loan_json in loan_data_list:
        loan = loans_db.create_loan(loan_json["loan_name"], loan_json["loan_description"], loan_json["loan_website"], loan_json["loan_gov"], loan_json["loan_region"], loan_json["loan_city"], loan_json["loan_credit_union"], category.category_loans_id, loan_json["loan_photo"])
 

