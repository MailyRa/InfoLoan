
import {Map, GoogleApiWrapper} from 'google-maps-react';

const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useParams = ReactRouterDOM.useParams;
const useHistory = ReactRouterDOM.useHistory;
const Promise = ReactRouterDOM.Promise;
const useLocation = ReactRouterDOM.useLocation;




function Homepage() {
    return <div>
        <h2>Welcome we are here to help you 
            with any financial question you may have!</h2>
        <h4> <Link to="/loan_categories"> Check out our different loan categories </Link> </h4>
        </div>
}





// Handling User login 
function Login() {

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
        //when I use the "useHook" it makes it slow
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
    


    React.useEffect(() => {
        fetch("/user_profile.json", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
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
    }, [])

    return (
        <div>
        <h1> Profile </h1> 
        <p>First Name: {fname} </p>
        <p>Last Name: {lname}</p>
        <p>Date of Birth: {dob} </p>
        <p>Address: {address} </p>
        <p>Credit Score: {credit_score}</p>
        <p>Email: {email}</p>


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








// Displaying all the loans by categories
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
                <SavedLoansRow 
                    id={loan["loan_id"]}
                    name={loan["loan_name"]}
                    description={loan["loan_description"]}
                    website={loan["loan_website"]}
                    gov={loan["loan_gov"]}
                    region={loan["loan_region"]}
                    city={loan["loan_city"]}
                    creditUnion={loan["loan_credit_union"]}
                    isSaved={false} />
            );
        }
        return [loanData, data]
    }, [])
}




//Getting the Category Loan Json from Server
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
                    //Play with this using Key instead of ID/make unique key using primary Key 
                     id={category["category_id"]}
                     name={category["category_name"]}/>
                );
            }

            setCategories(categoryData);
        })
    }, [])



    const [loans, setLoans] = React.useState([""])
    const [loanJson, setLoanJson] = React.useState([""])
    const updateLoans = (category_id) => {
        if (category_id === "") {
            setLoans()
            return
        }
        getLoans(category_id).then(response => {
            setLoans(response[0])
            setLoanJson(response[1])
        })
    }



    const filterLoansEvent = (event) => {
        const loanData = filterLoans(event, loanJson, false)
        setLoans(loanData)
    }


    return (
    
        <div>
            <input type="text" placeholder="Search..." value={props.inputValue} onChange={filterLoansEvent} />
            <button> Search  </button>
            <form>
            <label htmlFor="Loan Categories"> Choose a loan type: </label><br/>
            <select name="loans" id="loans" onChange={e => updateLoans(e.target.value)}>
                <option id="0"></option>
                {categories}
            </select>
            </form>
            <LoanCategoryTable 
                rows={loans} />
            
        </div>
    );
}



//Category Loan Table
function LoanCategoryTable(props) {
    return (
        <table class="table table-striped">
            <thead>
                <tr>
                <th></th>
                <th>Name</th>
                <th>Description</th>
                <th>Website</th>
                <th>Government</th>
                <th>State</th>
                <th>City</th>
                <th>Credit Union</th>
                </tr>
            </thead>
            <tbody>
                {props.rows}
            </tbody>
        </table>
    )
}







//Fetch the data to compare the loans for the user 
function LoanContainer(props) {
    let { category_id } = useParams();

    const [loan, setLoan] = React.useState(['']);
    React.useEffect(() => {
        if (category_id === "") {
            return
        }
        getLoans(category_id).then(response => {
            setLoan(response[0])
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







//Fetch saved loans by user/allow user to compare them and the search feature 
function SavedLoansRow(props) {
    
    let history = useHistory();

    const handleUnsave = (e) => {
        e.preventDefault()
        fetch("/delete_loan.json", {
            method: 'POST',
            body: JSON.stringify({"loan_id": props.id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if ("delete" in data) {
                history.push('/saved_loans');
            }
         
        })
    }

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
                ("Error" in data); {
                    alert("Loan already Saved")
                }
            }
        })
    }

    if (props.isSaved === true) {
        return (
            <tr>
                <td><input type="checkbox" name={props.id}/>
                    {' '}
                    <p>Check to compare loan</p>
                    <button 
                        onClick={handleUnsave}>
                        Unsave </button>
                </td>
                <td>{props.name}</td>
                <td>{props.description}</td>
                <td><a href={props.website}>Visit website</a></td>
                <td>{props.gov}</td>
                <td>{props.region}</td>
                <td>{props.city}</td>
                <td>{props.creditUnion}</td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td><button onClick={saveLoan}>Save</button></td>
                <td>{props.name}</td>
                <td>{props.description}</td>
                <td><a href={props.website}>Visit website</a></td>
                <td>{props.gov}</td>
                <td>{props.region}</td>
                <td>{props.city}</td>
                <td>{props.creditUnion}</td>
            </tr>
        )
    }
}


//Search Feature
function searchIsMatch(loanJson, searchTerm) {
    return loanJson["loan_name"].toLowerCase().includes(searchTerm.toLowerCase()) 
    || loanJson["loan_description"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_website"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_gov"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_region"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_city"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_credit_union"].toLowerCase().includes(searchTerm.toLowerCase())
    return true
}

const filterLoans = (event, savedLoanJson, areSaved) => {
    const filteredLoans = [];
    for(const loanJson of savedLoanJson) {
        if(searchIsMatch(loanJson, event.target.value)) {
            filteredLoans.push(loanJson);
        }
    }

    const loanData = []
    for(const loan of filteredLoans) {
        loanData.push(
                <SavedLoansRow
                    id={loan["loan_id"]}
                    name={loan["loan_name"]}
                    description={loan["loan_description"]}
                    website={loan["loan_website"]}
                    gov={loan["loan_gov"]}
                    region={loan["loan_region"]}
                    city={loan["loan_city"]}
                    creditUnion={loan["loan_credit_union"]}
                    isSaved={areSaved}/>
        );
    }
    return loanData
}




//Save Loans
function SavedLoans(props) {

    const [savedLoans, setSavedLoans] = React.useState(['']);
    const [savedLoanJson, setSavedLoanJson] = React.useState([])
    React.useEffect(() => {
        fetch("/user_profile.json", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            const loanData = []
            for(const loan of data["loans"]) {
                loanData.push(
                        <SavedLoansRow
                            id={loan["loan_id"]}
                            name={loan["loan_name"]}
                            description={loan["loan_description"]}
                            website={loan["loan_website"]}
                            gov={loan["loan_gov"]}
                            region={loan["loan_region"]}
                            city={loan["loan_city"]}
                            creditUnion={loan["loan_credit_union"]}
                            isSaved={true}/>
                );
            }
            setSavedLoanJson(data["loans"]);
            setSavedLoans(loanData);
        })

    }, [])

    const loanFilterOnChange = (event) => {
        const loanData = filterLoans(event, savedLoanJson, true)
        setSavedLoans(loanData)
    }

    return (
        <div>
            <input type="text" placeholder="Search..." value={props.inputValue} onChange={loanFilterOnChange} />
            <button> Search  </button>
            <form action="/compare_loans">
                <button>Compare Loans</button>
                <h2>Saved Loans</h2>
                <LoanCategoryTable 
                    rows={savedLoans} />
            </form>
        </div>
    )
}







//Compare the loans the user saves
function CompareLoansList(props) {
    const location = useLocation();

    const queryDict = new URLSearchParams(location.search);
    
    let loanIds = [];
    for(const key of queryDict) {
        loanIds.push(key[0])
    }

    const [loanData, setLoanData] = React.useState([]);

    React.useEffect(() => {
        fetch("/compare_loans.json", {
            method: "POST",
            body: JSON.stringify({"loan_ids": loanIds}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, 
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let loanArr = [];
            for(const loanJson of data) {
                loanArr.push(
                    <tr>
                        <td>{loanJson["loan_name"]}</td>
                        <td>{loanJson["loan_description"]}</td>
                        <td>{loanJson["loan_website"]}</td>
                        <td>{loanJson["loan_gov"]}</td>
                        <td>{loanJson["loan_region"]}</td>
                        <td>{loanJson["loan_city"]}</td>
                        <td>{loanJson["loan_credit_union"]}</td>
                    </tr>
                )
            }
            setLoanData(loanArr);
        })
    }, [])

    return (
        <table class="table table-striped">
            <thead>
                <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Website</th>
                <th>Government</th>
                <th>State</th>
                <th>City</th>
                <th>Credit Union</th>

                </tr>
            </thead>
            <tbody>
                {loanData}
            </tbody>
        </table>
    )
}









function App() {

    const isLoggedIn = localStorage.getItem('is_logged_in');

    const [loginOutButton, setLoginOutButton] = React.useState(['']);
    React.useEffect(() => {
        let listItem = undefined;
        if(isLoggedIn === 'true') {
            listItem = 
                    <ul>
                        <li className="nav-item">
                            <a className="nav-link" href="/logout">Logout</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/user_profile">Profile</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/loan_categories"> Loan Categories</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/saved_loans"> Saved Loans</a>
                        </li>
                    </ul>
        } else {
            
            listItem =
                    <ul>
                        <li className="nav-item active">
                            <a className="nav-link" href="/login">Login</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/create_user_form"> Create Profile </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/loan_categories"> Loan Categories</a>
                        </li>
                    </ul>

        }

            setLoginOutButton(listItem)
    }, [])



    render() {

        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            />

        );

    }




    return (
        <Router>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">InfoLoan!</a>
                <button className="navbar-toggler" type="button"  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
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
                    <Route path="/saved_loans">
                        <SavedLoans />
                    </Route>
                    <Route path="/compare_loans">
                        <CompareLoansList />
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