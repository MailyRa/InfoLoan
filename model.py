from flask import Flask

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_to_db(flask_app, db_uri='postgresql:///loans', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True

    db.app = flask_app
    db.init_app(flask_app)
    db.create_all()

class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    dob = db.Column(db.DateTime)
    address = db.Column(db.String)
    credit_score = db.Column(db.Integer)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __repr__(self):
        return f'<User user_id={self.user_id}, fname={self.fname}, lname={self.lname}, dob={self.dob}, address={self.address}, email={self.email}, password={self.password}'



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
    
    def __repr__(self):
        return f'<Loan loan_id={self.loan_id}, loan_name={self.loan_name}, loan_description={self.loan_description}'

class User_loan(db.Model):
    __tablename__ = 'user_loan'

    user_loan_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey('loan.loan_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __repr__(self):
        return f'<User_loan user_loan_id={self.user_loan_id}, load_id={self.loan_id}'

class Category_loan(db.Model):
    __tablename__ = 'category_loan'

    category_loans_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    category_name = db.Column(db.String)

    def __repr__(self):
        return f'<Category_loan category_loans_id={self.category_loans_id}, category_name={self.category_name}'


if __name__ == '__main__':
    from server import app
    connect_to_db(app)