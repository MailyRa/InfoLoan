import os
import json
from random import choice, randint
from datetime import datetime

from crud import create_category_loan
import model
import server
from data import loan.json

os.system('dropdb ratings')
os.system('createdb ratings')

model.connect_to_db(server.app)
model.db.create_all()

with open('data/loan.json') as f:

    loan_data = json.loads(f.read())

# loan_in_db = []

for category_json in json:
    category = create_category_loan(category_json["category_name"])
    loan_data_list = category_json["loans"]
    for loan_json in loan_data_list:
        loan = create_loan(loan_json["loan_name"], loan_json["loan_description"], loan_json["loan_website"], category.category_loans_id)

    # db_loan = crud.create_loan(loan_name,
    #                             loan_description,
    #                             category_loans_id)
                            
