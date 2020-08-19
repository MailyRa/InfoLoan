const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;

function Homepage() {
    return <div>Welcome to InfoLoan!</div>
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
                return
            
            } else { 
                alert("Sucessful login" + data["user_email"])
                //how to put together the name and the sucessful login to the alert
                //redirect to loan categories 
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
            <input type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button onClick={handleLogIn}> Submit </button>
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
            //data about the request.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if ("error" in data) {
                alert(data["error"]);
                <Switch>
                    <Redirect path="/login">
                        <Login />
                    </Redirect>
                </Switch>
        
            } else {
                <Switch>
                    <Redirect path="/loan_categories">
                        <CategoryContainer />
                    </Redirect>
                </Switch>   
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
            <input type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}/>

            <button onClick={createUser}> Create Profile </button>
        </div>
    )
}





// Loan Categories
function CategoriesListItem(props) {
    return <li>{props.name}</li>
}

function CategoryContainer() { 
    const [categories, setCategories] = React.useState(["loading..."]);
    React.useEffect(() => {
        fetch('/loan_categories.json')
        .then((response) => response.json())
        .then((data) => {
            const categoryData = []
            for (const category of data) {
                categoryData.push(
        
                    <CategoriesListItem name={category}/>
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


//Car Loans

//Home Loans

//Personal Loans

//Business Loans

//Education Loans







// What it shows in my homepage 
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
                            <Link to="/loan_categories"> Loan Categories </Link>
                        </li>
                        <li>
                            <Link to="/create_user_form"> Create Profile </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/create_user_form">
                        <CreateUser />
                    </Route>
                    <Route path="/login">
                        <Login />
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


