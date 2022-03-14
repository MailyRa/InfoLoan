import os
import json
from random import choice, randint

from crud import create_category_loan, create_loan
import model
import server
import data 

os.system('dropdb loans')
os.system('createdb loans')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/loan.json') as f:
    loan_data = json.loads(f.read())

for category_json in loan_data:
    category = create_category_loan(category_json["category_name"])
    loan_data_list = category_json["loans"]
    for loan_json in loan_data_list:
        loan = create_loan(loan_json["loan_name"], loan_json["loan_description"], loan_json["loan_website"], loan_json["loan_gov"], loan_json["loan_region"], loan_json["loan_city"], loan_json["loan_credit_union"], category.category_loans_id, loan_json["loan_photo"])
 

