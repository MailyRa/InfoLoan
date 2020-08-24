const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useParams = ReactRouterDOM.useParams;
const useHistory = ReactRouterDOM.useHistory;
const Promise = ReactRouterDOM.Promise;

function Homepage() {
    return <div>
        <h2>Welcome we are here to help you 
            with any financial question you may have!</h2>
        <h4> <Link to="/loan_categories"> Check out our different loan categories </Link> </h4>
        </div>
}



// Handling User login 
function Login() {


    let history = useHistory();

    const[email, setEmail] = React.useState('');
    const[password, setPassword] = React.useState('');

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
                localStorage.setItem('is_logged_in', true);
                window.location.href = "/loan_categories";
            }
        })
    }

    return(
        <div>
            <p>Username:</p>
            <input type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}/>
            <p>Password:</p>
            <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button 
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
        localStorage.setItem('is_logged_in', false);
        window.location.href = "/login";
    })
}



//User profile 
function Userprofile (props) {


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
            const loanList =[]
            for(const loan of data["loans"]) {
                console.log(loan)
                loanList.push(<p>{loan["loan_name"]}</p>);
            }
    
        })
    }, []);

    return (
        <div>
        <h1> Profile </h1> 
        <p>First Name: {fname} </p>
        <p>Last Name: {lname}</p>
        <p>Date of Birth: {dob} </p>
        <p>Address: {address} </p>
        <p>Credit Score: {credit_score}</p>
        <p>Email: {email}</p>

        <ul>
            {usersLoans}
        </ul>
    </div>
    )
}




// Creating User
function CreateUser() {

    let history = useHistory();

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
                history.push('/login');
            } else {
                history.push('/loan_categories');
            }
    
        })
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
            <input type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button onClick={createUser}> Create Profile </button>
        </div>
    )
}




// Loan Categories
function CategoriesListItem(props) {
    return <option value={props.id}>{props.name}</option>

}

function getLoans(category_id) {
    const loanData = [];
    return fetch("/loans.json?category_id=" + category_id)
    .then((response) => response.json())
    .then((data) => {
        for(const loan of data) {
            loanData.push(
                <LoanList 
                    id={loan["loan_id"]}
                    name={loan["loan_name"]}
                    description={loan["loan_description"]}
                    website={loan["loan_website"]}/>
            );
        }
        return loanData
    }, [])
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

    const [loans, setLoans] = React.useState([""])
    const updateLoans = (category_id) => {
        if (category_id === "") {
            setLoans()
            return
        }
        getLoans(category_id).then(response => {
            setLoans(response)
        })
    }

    return (
    
        <div>
            <form>
            <label htmlFor="Loan Categories"> Choose a loan type: </label><br/>
            <select name="loans" id="loans" onChange={e => updateLoans(e.target.value)}>
                <option id="0"></option>
                {categories}
            </select>
            
            </form>

            <ul>
                {loans}
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
            } else {
                alert("error")
            }
        })
    }
    return <li>
        <div>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
            <p><a href={props.website}>{props.website}</a></p>
            <button
             onClick={saveLoan}> Save Loan</button>
        </div>
    </li>
}


function LoanContainer(props) {
    let { category_id } = useParams();

    const [loan, setLoan] = React.useState(['']);
    React.useEffect(() => {
        if (category_id === "") {
            return
        }
        getLoans(category_id).then(response => {
            setLoan(response)
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

    const isLoggedIn = localStorage.getItem('is_logged_in');

    const [loginOutButton, setLoginOutButton] = React.useState(['']);
    React.useEffect(() => {
        let listItem = undefined;
        if(isLoggedIn === 'true') {
            listItem = 
                <li className="nav-item">
                    <a className="nav-link" href="/logout">Logout</a>
                </li>
        } else {
            
            listItem =
                <li className="nav-item">
                    <a className="nav-link" href="/login">Login</a>
                </li>

        }

            setLoginOutButton(listItem)
    }, [])

    return (
        <Router>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">InfoLoan!</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        {loginOutButton}
                    </ul>
                </div>
            </nav>
            <div>
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
                    <Route path="/save_loans">
                        <LoanList />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))