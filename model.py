from flask import Flask

from flask_sqlalchemy import SQLAlchemy

from datetime import datetime

db = SQLAlchemy()

flask_app = Flask(__name__)
flask_app.secret_key = 'SECRET'



def connect_to_db(flask_app, db_uri='postgresql:///ratings', echo=True):
    flask_app.config['SQLALCHEMY_DATABASE_URI'] = db_uri
    flask_app.config['SQLALCHEMY_ECHO'] = echo
    flask_app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.app = flask_app
    db.init_app(flask_app)

connect_to_db(flask_app, "ratings")


class User(db.Model):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    fname = db.Column(db.String)
    lname = db.Column(db.String)
    dob = db.Column(db.Date)
    address = db.Column(db.String)
    credit_score = db.Column(db.Integer)
    email = db.Column(db.String, unique=True)
    password = db.Column(db.String)

    def __repr__(self):
        return f'<User user_id={self.user_id}, fname={self.fname}, lname={self.lname}, 
        dob={self.dob}, address={self.address}, email={self.email}, password={self.password}'



class Loan(db.Model):
    __tablename__ = 'loan'

    loan_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    loan_name = db.Column(db.String)
    loan_description = db.Column(db.String)
    category_loans_id = db.Column(db.String, db.ForeignKey('category_loan.category_loans_id'))

    def __repr__(self):
        return f'<Loan loan_id={self.loan_id}, loan_name={self.loan_name}, loan_description={self.loan_description}'

class User_loan(db.Model):
    __tablename__ = 'user_loan'

    user_loan_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey('loan.loan_id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))

    def __repr__(self):
        return f'<User_loan user_loan_id={self.user_loan_id}'

class Category_loan(db.Model):
    __tablename__ = 'category_loan'

    category_loans_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    category_name = db.Column(db.String)

    def __repr__(self):
        return f'<Category_loan category_loans_id={self.category_loans_id}, category_name={self.category_name}'

class Loan_website(db.Model):
    __tablename__ = 'loan_website'

    loan_website_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey('loan.loan_id'))
    url = db.Column(db.String)

    def __repr__(self):
        return f'<Loan_website loan_website_id={self.loan_website_id}, url={self.url}'



if __name__ == '__main__':
    from server import app

    # Call connect_to_db(app, echo=False) if your program output gets
    # too annoying; this will tell SQLAlchemy not to print out every
    # query it executes.

    connect_to_db(app)