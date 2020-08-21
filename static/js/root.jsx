const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useParams = ReactRouterDOM.useParams;

function Homepage() {
    return <div>
        <h1>Welcome to InfoLoan!</h1>
        <h4> Check out the different loan categories</h4>
        </div>
}




// Handling User login 
function Login() {
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[redir, setRedir] = React.useState('');

    const handleLogIn = () => {
        const user = {"user_email": email, "user_password": password}

        fetch("/handle_login", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })

        .then(response => response.json())
        .then(data => {
            if("error" in data) {
                alert(data["error"])
            } else { 
                alert("Sucessful Login!" + " " + data["user_email"])
                setRedir('/loan_categories')
            }
        })
    }

    if (redir !== '') {
        window.location.href = redir
    }

    return(
        <div>
            <p>Username:</p>
            <input type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>
            <p>Password:</p>
            <input type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button id= "Login" 
            onClick={handleLogIn}> Submit </button>
        </div>
    )
}







// Handle Logout 
function Logout(props){
    fetch("handle_logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
    })

    window.location.href = "/login";
}




//User profile 

function SaveLoanItem (props) {
    return <li>{props.name}</li>

}


function Userprofile(props) {
    //Here the user will see their saved loans 
    //Have the option to compare it to other loans they saved
    //Edit their personal info 
    //Option to add a photo to their profile?

    const[fname, setFname] = React.useState('');
    const[lname, setLname] = React.useState('');
    const[dob, setDob] = React.useState('');
    const[address, setAddress] = React.useState('');
    const[credit_score, setCreditScore] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[usersLoans, setUsersLoans] = React.useState('');

    React.useEffect(() => {
        fetch("/user_profile.json", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            setFname(data["fname"]),
            setLname(data["lname"]),
            setDob(data["dob"]),
            setAddress(data["address"]),
            setCreditScore(data["credit_score"]),
            setEmail(data["email"])

            for(const loan of data["loans"]) {
                console.log(loan)
                <SaveLoanItem 
                    name={loan["loan_name"]}
                    description={loan["loan_description"]}
                    website={loan["loan_website"]}/>

            }
        })
    })
    return (
        <div id="User">
            <p><h1>Profile</h1></p>
            <p><h3>First Name:</h3> {fname}</p>
            <p><h3>Last Name:</h3> {lname}</p>
            <p><h3>Date of Birth:</h3> {dob} </p>
            <p><h3>Address:</h3> {address} </p>
            <p><h3>Credit Score:</h3> {credit_score}</p>
            <p><h3>Email: </h3> {email}</p>

            <ul>
                {usersLoans}
            </ul>
        </div>
       
    )
}




// Creating User
function CreateUser() {

    const[fname, setFname] = React.useState('');
    const[lname, setLname] = React.useState('');
    const[dob, setDob] = React.useState('');
    const[address, setAddress] = React.useState('');
    const[credit_score, setCreditScore] = React.useState('');
    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');
    const[redir, setRedir] = React.useState('');

    const createUser = () => {
        const user = {"user_fname": fname, "user_lname": lname, "user_dob": dob, "user_address": address,
                     "user_credit_score": credit_score, "user_email": email, "user_password": password}
            
        if(fname === "" || lname === "" || dob === "" || address === "" || credit_score === "" || email === "" || password === "") {
            alert("Must complete form");
            return
        }
        fetch("/create_user", {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if ("error" in data) {
                alert(data["error"])
                setRedir('/login')
            } else {
                setRedir('/loan_categories')
            }
    
        })
    }
    if (redir !== '') {
        window.location.href = redir
    }

    return(
        <div>
            <p>First Name:</p>
            <input type="text" 
            onChange={(e) => setFname(e.target.value)}
            value={fname}/>

            <p>Last Name:</p>
            <input type="text"
            onChange={(e) => setLname(e.target.value)} 
            value={lname}/>


            <p>Date of Birth:</p>
            <input type="text"
            onChange={(e) => setDob(e.target.value)}
            value={dob}/>


            <p>Address:</p>
            <input type="text"
            onChange={(e) => setAddress(e.target.value)}
            value={address}/>


            <p>Credit Score:</p>
            <input type="text"
            onChange={(e) => setCreditScore(e.target.value)}
            value={credit_score}/>


            <p>Email:</p>
            <input type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>


            <p>Password:</p>
            <input type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button onClick={createUser}> Create Profile </button>
        </div>
    )
}







// Loan Categories
function CategoriesListItem(props) {
    const href = "/loans/"+props.id
    return <li><a href={href}>{props.name}</a></li>

}

function CategoryContainer(props) { 
    const [categories, setCategories] = React.useState(["loading..."]);
    React.useEffect(() => {
        fetch('/loan_categories.json')
        .then((response) => response.json())
        .then((data) => {
            const categoryData = []
            for (const category of data) {
                categoryData.push(
        
                    <CategoriesListItem 
                     id={category["category_id"]}
                     name={category["category_name"]}/>
                );
            }
            setCategories(categoryData);
        })
    }, [])

    return (
    
        <div>
            <ul>
                {categories}
            </ul>
        </div>
    );
}




// Loans
function LoanList(props){
    //Save Loan in User Profile
    const saveLoan = () => {
        fetch("/save_loan.json", {
            method: 'POST',
            body: JSON.stringify({"loan_id": props.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then((response) => response.json())
        .then(data => {
            if ("success" in data) {
                alert( "Loan Saved!")
            }else {
                alert("error")
            }
        })
    }
    return <li>
        <div>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p><a href={props.website}>{props.website}</a></p>
            <button id="saveLoan"
             onClick={saveLoan}> Save Loan</button>
        </div>
    </li>
}


function LoanContainer(props) {
    let { category_id } = useParams();

    const [loan, setLoan] = React.useState(['']);
    React.useEffect(() => {
        fetch("/car_loans.json?category_id=" + category_id)
        .then((response) => response.json())
        .then((data) => {
            const loanData = []
            for(const loan of data) {
                console.log(loan)
                loanData.push(
                    <LoanList 
                        id={loan["loan_id"]}
                        name={loan["loan_name"]}
                        description={loan["loan_description"]}
                        website={loan["loan_website"]}/>
                );
            }
            setLoan(loanData);
        })
    }, [])

    return (
        <div>
            <ul>
                {loan}
            </ul>
        </div>
    );
}
function App() {
    return(
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/"> Home </Link>
                        </li>
                        <li>
                            <Link to="/login"> Log In </Link>
                        </li>
                        <li>
                            <Link to="/logout">Log out</Link>
                        </li>
                        <li>
                            <Link to="/loan_categories"> Loan Categories </Link>
                        </li>
                        <li>
                            <Link to="/create_user_form"> Create Profile </Link>
                        </li>
                        <li>
                            <Link to="/user_profile"> Profile </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/user_profile">
                        <Userprofile />
                    </Route>
                    <Route path="/loans/:category_id">
                        <LoanContainer />
                    </Route>
                    <Route path="/create_user_form">
                        <CreateUser />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route> 
                    <Route path="/logout">
                        <Logout />
                    </Route>
                    <Route path="/loan_categories">
                        <CategoryContainer />
                    </Route>
                    <Route path="/">
                        <Homepage />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))


