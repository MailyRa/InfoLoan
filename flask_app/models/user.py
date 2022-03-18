from db import db

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
