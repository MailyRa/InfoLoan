from model import db, User, Loan, User_loan, Category_loan 

def create_user(fname, lname, dob, address, credit_score, email, password):

    user = User(fname=fname, lname=lname, dob=dob, address=address, credit_score=credit_score, email=email, password=password)

    db.session.add(user)
    db.session.commit()

    return user 

def create_loan(loan_name, loan_description, loan_website, loan_gov, loan_region, loan_city, loan_credit_union, category_loans_id, loan_photo):

    loan = Loan(loan_name=loan_name,
                loan_description=loan_description,
                loan_website=loan_website,
                loan_gov=loan_gov,
                loan_region=loan_region,
                loan_city=loan_city,
                loan_credit_union=loan_credit_union,
                category_loans_id=category_loans_id,
                loan_photo=loan_photo)

    db.session.add(loan)
    db.session.commit()

    return loan 

def save_loan_for_user(user_id, loan_id):

    save_loan = User_loan(user_id=user_id, 
                          loan_id=loan_id)
    
    existing_loan = db.session.query(User_loan).filter(User_loan.user_id == user_id).filter(User_loan.loan_id == loan_id).first()

    if existing_loan: 
        return None 

    db.session.add(save_loan)
    db.session.commit()

    return save_loan


def delete_loan_for_user(user_id, loan_id):

    
    db.session.query(User_loan).filter(User_loan.user_id == user_id).filter(User_loan.loan_id == loan_id).delete()
    db.session.commit()




def create_category_loan(category_name):

    category_loan = Category_loan(category_name=category_name)

    db.session.add(category_loan)
    db.session.commit()

    return category_loan

def create_user_loan(loan_id, user_id):

    user_loan = User_loan(loan_id=loan_id, user_id=user_id)

    db.session.add(User_loan)
    db.session.commit()

    return user_loan


def get_category_loans():

    return Category_loan.query.all()




def get_user_loans_by_user(user_id):
    
    return db.session.query(User_loan, Loan).join(Loan, User_loan.loan_id==Loan.loan_id).filter(User_loan.user_id==user_id).all()


def get_user_by_id(user_id):

    return User.query.filter(User.user_id == user_id).first()


def get_user_by_email(email):

    return User.query.filter(User.email == email).first()


def get_category_by_id(category_loan_id):

    return Category_loan.query.filter(Category_loan.category_loans_id==category_loan_id).first()


def get_loans_by_category_id(category_loan_id):

    return Loan.query.filter(Loan.category_loans_id==category_loan_id).all()


def get_loans_by_ids(loan_ids):
    # Get all loans that have ids in this list
    return Loan.query.filter(Loan.loan_id.in_(loan_ids)).all()

