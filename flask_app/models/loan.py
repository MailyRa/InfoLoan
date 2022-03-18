from db import db

class Loan(db.Model):
    __tablename__ = 'loan'

    loan_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    loan_name = db.Column(db.String)
    loan_description = db.Column(db.String)
    category_loans_id = db.Column(db.Integer, db.ForeignKey('category_loan.category_loans_id'))
    loan_website= db.Column(db.String)
    loan_gov= db.Column(db.String)
    loan_region = db.Column(db.String)
    loan_city = db.Column(db.String)
    loan_credit_union = db.Column(db.String)
    loan_photo = db.Column(db.String)
    
    def __repr__(self):
        return f'<Loan loan_id={self.loan_id}, loan_name={self.loan_name}, loan_description={self.loan_description}'
