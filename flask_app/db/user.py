from db import db
from models.user import User


def create_user(fname, lname, dob, address, credit_score, email, hashed_password):
    user = User(fname=fname, lname=lname, dob=dob, address=address, credit_score=credit_score, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()
    return user 


def get_user_by_id(user_id):
    return User.query.filter(User.user_id == user_id).first()


def get_user_by_email(email):
    return User.query.filter(User.email == email).first()
