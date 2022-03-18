from db import db 

class Category_loan(db.Model):
    __tablename__ = 'category_loan'

    category_loans_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    category_name = db.Column(db.String)

    def __repr__(self):
        return f'<Category_loan category_loans_id={self.category_loans_id}, category_name={self.category_name}'
