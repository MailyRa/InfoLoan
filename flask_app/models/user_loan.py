from db import db 

class User_loan(db.Model):
    __tablename__ = 'user_loan'

    user_loan_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey('loan.loan_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __repr__(self):
        return f'<User_loan user_loan_id={self.user_loan_id}, load_id={self.loan_id}'
