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
const useRef = ReactRouterDOM.useRef;
const Form = ReactBootstrap.Form;
const Column = ReactBootstrap.Column; 
const Image = ReactBootstrap.Image;
const Carousel = ReactBootstrap.Carousel;
const Container = ReactBootstrap.Container;
const Row = ReactBootstrap.Row;
const Col = ReactBootstrap.Col;
const Button = ReactBootstrap.Button;
const Card = ReactBootstrap.Card;
const CardGroup = ReactBootstrap.CardGroup;
const Jumbotron = ReactBootstrap.Jumbotron;
const DropdownButton = ReactBootstrap.DropdownButton;
const Dropdown = ReactBootstrap.Dropdown;
const CardDeck = ReactBootstrap.CardDeck;
const CardColumns = ReactBootstrap.CardColumns;

var googleApiKey = 'AIzaSyAlaAqpQcTQsNsUPnlKrwJYA-BJioBbwCU';

function ControlledCarousel() {
    const [index, setIndex] = React.useState(0);
    let history = useHistory();
    
    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    const BrowseLoansClicked = (e) => {
        history.push('/loan_categories');
    };
  
    return (
        <Container fluid="md">
            <Row>
            <Col>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                <Carousel.Item>
                <img
                    className="homepage w-100"
                    src="static/jpg/college.jpg?text=First slide&bg=373940"
                    alt="First slide"
                />
                <Carousel.Caption className="homepage-phrase">
                    <h3>Welcome to the beginning of your Loan Journey</h3>
                    <p>Need help paying your School Loans?</p>
                    

                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="homepage w-100"
                    src="static/jpg/homepage.jpg?text=Second slide&bg=282c34"
                    alt="Second slide"
                />
        
                <Carousel.Caption className="homepage-phrase">
                    <h3>Ready to buy a home?</h3>
                    <p>Find out what loans are best for you</p>
                </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <img
                    className="homepage w-100"
                    src="static/jpg/credit.jpg?text=Third slide&bg=20232a"
                    alt="Third slide"
                />
                <Carousel.Caption className="homepage-phrase">
                    <h3>Too many credit card balances?</h3>
                    <p>We have the best options to help you lower you balances</p>
                </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            </Col>
            </Row>

            <Row md={4} id="hand">
                <Col>
                <div className="money">
                    <i class="fas fa-hand-holding-usd fa-8x"></i>
                    
                </div>
                <div className="money-div">
                    <p>We are here to help you embark in your financial journey!</p>
                </div>
        
                </Col>
            </Row>
            <Row>
                <Col>
                <div className="homepage-button">
                    <Button variant="primary" type="submit" size="md" onClick={BrowseLoansClicked}>
                    Browse our loans
                    </Button>
                </div>
                </Col>
            </Row>
        </Container>
    );
}


function Homepage() {
    return (
        <ControlledCarousel />
    )
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
        <Form className="log-in">
            <Card style={{ width: '30rem'}}>
            <Card.Img id="card-img" variant="bottom" src="static/jpg/login.jpg" />
            <Card.Body>
                <Card.Title>Sign In</Card.Title>
                <Card.Text>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}
                    value={email}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}
                    value={password}/>
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleLogIn}>
                    Submit
                </Button>
                </Card.Text>
            </Card.Body>
            </Card>
        </Form>
    )
}

// Handle Logout 
function Logout(props){
    fetch("/handle_logout", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('is_logged_in', "false");
        window.location.href = "/";
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
            alert(data)
            if ("error" in data) {
                alert(data["error"])
                window.location.href = '/login';
            } else {
                localStorage.setItem('is_logged_in', true);
                window.location.href = '/loan_categories';
            }
        })
    }

    return(
        <Form className="log-in" >
            <Card style={{ width: '30rem' }}>
                <Card.Img id="card-img" variant="bottom" src="static/jpg/create_profile.jpg" />
                <Card.Header as="h5">Create Profile</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Row>
                                <Form.Group as={Col} controlId="formGridName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="First Name" onChange={(e) => setFname(e.target.value)} value={fname} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name </Form.Label>
                                <Form.Control type="text" placeholder="Last Name" onChange={(e) => setLname(e.target.value)} value={lname}/>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                                </Form.Group>

                                <Form.Group as={Col}  controlId="formGridPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
                                </Form.Group>
                            </Row>

                            <Form.Group md="3" controlId="formGridAddress1">
                                <Form.Label>Address</Form.Label>
                                <Form.Control placeholder="1234 Main St" onChange={(e) => setAddress(e.target.value)} value={address}/>
                            </Form.Group>
                            <Row>
                            <Form.Group as={Col}  controlId="formGridDateBirth">
                                <Form.Label>Date of Birth</Form.Label>
                                <Form.Control placeholder="DOB" onChange={(e) => setDob(e.target.value)} value={dob}/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridCreditScore">
                                <Form.Label>Credit Score</Form.Label>
                                <Form.Control placeholder="Credit Score" onChange={(e) => setCreditScore(e.target.value)} value={credit_score}/>
                            </Form.Group>
                            </Row>
                        </Card.Text>
                        <Button variant="primary" onClick={createUser} type="submit">
                            Submit
                        </Button>
                    </Card.Body>
            </Card>
        </Form>

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
                    photo={loan["loan_photo"]}
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
            updateFilteredLoans(searchTerm, isGov);
        })
    }

    const [isUnion, setIsUnion] = React.useState();
    const [isGov, setIsGov] = React.useState();
    const [searchTerm, setSearchTerm] = React.useState('')

    const filterLoansEvent = (event) => {
        setSearchTerm(event.target.value)
        updateFilteredLoans(event.target.value, isGov, isUnion)
    }

    const handleGovTypeUpdated = (govType) => {
        var isGovTemp = null;
        if (govType === "Yes"){
            isGovTemp = true;
        } else if (govType === "No") {
            isGovTemp = false;
        } 
        setIsGov(isGovTemp)
        
        updateFilteredLoans(searchTerm, isGovTemp, isUnion)
    }

    const handleUnionUpdated = (unionType) => {
        var isUnionTemp = null;
        if (unionType === "Yes"){
            isUnionTemp = true;
        } else if (unionType === "No") {
            isUnionTemp = false;
        }
        setIsUnion(isUnionTemp)

        updateFilteredLoans(searchTerm, isGov, isUnionTemp)

    }

    function updateFilteredLoans(searchTerm, isGov, isUnion) {
        const loanData = filterLoans(searchTerm, loanJson, false, isGov, isUnion)
        setLoans(loanData)
    }
    return (
        <Container fluid="md">
                <div>
                <form >
                    <div className="md-form mt-0" id="search">
                        <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={props.inputValue} onChange={filterLoansEvent} />
                    </div>
                    <br></br>            
                <Jumbotron className="loans-background" style={{backgroundImage:
                    "url('static/jpg/loan_categories.jpg')"
                }}>                
                <br></br>
                <form className="loans">
                    <div className="loans_info">
                        <label htmlFor="Loan Categories"> Choose a loan type: </label><br/>
                        <select name="loans" id="loans" onChange={e => updateLoans(e.target.value)}>
                            <option id="0"></option>
                            {categories}
                        </select>
                    </div>
                    
                    <br/>
                    <div className="loans_info"> <label htmlFor="Government"> Government Loan: </label><br/>
                        <select name="government_loans" id="gov_loan" onChange={e => handleGovTypeUpdated(e.target.value)}>
                            <option id="0">All</option>
                            <option id="1">Yes</option>
                            <option id="2">No</option>   
                        </select>
                    </div>
                    <br/>
                    <div className="loans_info"><label htmlFor="Credit Union"> Credit Union: </label><br/>
                        <select name="credit_union" id="credit_union_bank" onChange={e => handleUnionUpdated(e.target.value)}>
                            <option id="0">All</option>
                            <option id="1">Yes</option>
                            <option id="2">No</option>   
                        </select>
                    </div>

                </form>
                <CardDeck>
                    {loans}
                </CardDeck>
                </Jumbotron>
                </form>
            </div>
        </Container>
    );
}


//Map Container 
function MapContainer(props) {
    const location = useLocation();
    const queryDict = new URLSearchParams(location.search);
    
    var searchTerm = "";
    for(const key of queryDict) {
        if (key[0] === "name") {
            searchTerm = key[1];
        }
    }
    
    const lat = 37.7749;
    const lng = -122.4194;

    const options = { center: { lat: lat, lng: lng }, zoom: 13 }
       
    return (
        <div id="map-container" >
            <MapComponent options={options}
                          searchTerm={searchTerm} />
        </div>
    )
}


function MapComponent(props) {
    const options = props.options;
    const ref = React.useRef();
    const [googleMap, setGoogleMap] = React.useState();
    const [places, setPlaces] = React.useState();
    const [pyrmont, setPyrmont] = React.useState();
    const [locations, setLocations] = React.useState([]);
    
    React.useEffect(() => {
        const onLoad = () => {
            const gMap = new window.google.maps.Map(ref.current, options);
            setPyrmont(new window.google.maps.LatLng(options.center.lat, options.center.lng));
            setGoogleMap(gMap);
            setPlaces(new google.maps.places.PlacesService(gMap));
        }

        let script = document.createElement("script");
        script.type = "text/javascript";
        script.src = 'https://maps.googleapis.com/maps/api/js?key=' + googleApiKey + '&libraries=places';
        if (script.readyState) {
            script.onreadystatechange = function() {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                onLoad();
            }
            };
        } else {
            script.onload = () => onLoad();
        }
        document.getElementsByTagName("head")[0].appendChild(script);
    }, [options])

    if (places && googleMap) {
        const request = {
            location: pyrmont,
            radius: '2000',
            query: props.searchTerm
        };
        places.textSearch(request, gmapCallback);
    }

    function gmapCallback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            var locationList = [];
            for (var i = 0; i < results.length; i++) {
                var place = results[i];
                const lat = place.geometry.location.lat();
                const lng = place.geometry.location.lng();
                const marker = new window.google.maps.Marker({
                    position: {
                        lat: lat,
                        lng: lng,
                    },
                    map: googleMap,
                    title: "Test",
                });        
                marker.setMap(googleMap);
                locationList.push(
                    <li className="google_map_list">
                        <a href={"https://maps.google.com/?q=".concat(place.formatted_address)}>{place.formatted_address}</a>
                    </li>
                )
            }
            setLocations(locationList)
        }
    }
    return (
        <div>
            <div id="map-div" 
                style={{ margin: `1em 0`, borderRadius: `0.5em` }}
                ref={ref}/>
            <ol>
                {locations}
            </ol>
        </div>
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
            if ("delete" in data) {
                window.location.href = "/saved_loans" ;
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
                window.showAlert("Loan Saved!")
            } else {
                ("Error" in data); {
                    window.showAlert("Loan already Saved")
                }
            }
        })
    }

    const handleFindNearestBank = () => {
        history.push('/map?name='+props.name);
    }

    if (props.isSaved === true) {
        return (
            <div class="col-lg-3">
                <Card style={{ width: '20em', padding: '10px'}}>
                    <Card.Img variant="top" src={props.photo} />
                    <Card.Body>
                        <Card.Title>{props.name} <i class="fas fa-university left fa-sm "> </i> </Card.Title>
                        
                        <Card.Subtitle className="mb-2 text-muted"><a href={props.website}>Visit website</a></Card.Subtitle>
                        
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                        
                        <Card.Text>
                            Government: {props.gov}
                        </Card.Text>
                        
                        <Card.Text>
                            State: {props.region}
                        </Card.Text>
                        
                        <Card.Text>
                            Credit Union: {props.creditUnion}
                        </Card.Text>
                        
                        <Card.Text id="compare">
                            <Form.Check label="Compare Loans!" size="md "  name={props.id}/>
                        </Card.Text>
                        
                        <Button variant="primary" size="sm "  block onClick={handleUnsave}>
                            UnSave 
                        </Button>
                        
                    </Card.Body>
                </Card>
            </div>
        )
    } else {
        return (
            <div class="col-lg-3">
                <Card style={{ width: '20em', padding: '10px'}}>
                    <Card.Img variant="top" src={props.photo} />
                    <Card.Body>
                        <Card.Title>{props.name} <i class="fas fa-university center fa-sm "> </i> </Card.Title>
                        
                        <Card.Subtitle className="mb-2 text-muted"><a href={props.website}>Visit website</a></Card.Subtitle>
                        
                        <Card.Text>
                            {props.description}
                        </Card.Text>
                        
                        <Card.Text>
                            Government: {props.gov}
                        </Card.Text>
                        
                        <Card.Text>
                            State: {props.region}
                        </Card.Text>
                        
                        <Card.Text>
                            Credit Union: {props.creditUnion}
                        </Card.Text>

                        <Button variant="primary" size="sm " block onClick={saveLoan}>
                            Save 
                        </Button>
                        
                        <Button variant="primary" size="" block onClick={handleFindNearestBank} ><i class="fas fa-search-location fa-sm"></i>
                            Near by Bank 
                        </Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

//Search Feature
function searchIsMatch(loanJson, searchTerm, isGov, isUnion) {
    var match = loanJson["loan_name"].toLowerCase().includes(searchTerm.toLowerCase()) 
    || loanJson["loan_description"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_website"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_gov"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_region"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_city"].toLowerCase().includes(searchTerm.toLowerCase())
    || loanJson["loan_credit_union"].toLowerCase().includes(searchTerm.toLowerCase())
    
    if (isGov === true) {
        match = match && (loanJson["loan_gov"] === "Yes")
    } else if (isGov === false) {
        match = match && (loanJson["loan_gov"] === "No")
    }

    if (isUnion === true) {
        match = match && (loanJson["loan_credit_union"] === "Yes")
    } else if (isUnion === false) {
        match = match && (loanJson["loan_credit_union"] === "No")
    }

    return match
}

const filterLoans = (value, savedLoanJson, areSaved, isGov, isUnion) => {
    const filteredLoans = [];
    for(const loanJson of savedLoanJson) {
        if(searchIsMatch(loanJson, value, isGov, isUnion)) {
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
                    photo={loan["loan_photo"]}
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
                            photo={loan["loan_photo"]}
                            isSaved={true}/>
                );
            }
            setSavedLoanJson(data["loans"]);
            setSavedLoans(loanData);
        })

    }, [])

    const loanFilterOnChange = (event) => {
        const loanData = filterLoans(event.target.value, savedLoanJson, true, null, null)
        setSavedLoans(loanData)
    }

    return (
        <div>
            <div className="md-form mt-0" id="search">
                <input className="form-control" type="text" placeholder="Search" aria-label="Search" value={props.inputValue} onChange={loanFilterOnChange} />
            </div>
            <br></br>
            <div>
                <form action="/compare_loans">

                    <h1>My Saved loans</h1>
                    <div style={{"padding-top": "30px", "padding-bottom": "30px"}}>
                        <button className="unsave_button">Compare Loans</button>
                    </div>
                    <div>
                        {/* <CardColumns> */}
                        <CardDeck>
                        {savedLoans} 
                        </CardDeck>
                        {/* </CardColumns> */}
                    </div>
                </form>
            </div>
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
            let loanArr = [];
            for(const loanJson of data) {
                loanArr.push(
                    <tr>
                        <td><img src={loanJson["loan_photo"]} style={{width: "100px"}}></img></td>
                        <td>{loanJson["loan_name"]}</td>
                        <td>{loanJson["loan_description"]}</td>
                        <td><a href={loanJson["loan_website"]}> Visit website</a></td>
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
            listItem = (
                <ul class="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/logout">Logout</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/user_profile">Profile</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/loan_categories"> Find Loans</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/saved_loans"> Your Saved Loans</a>
                    </li>
                </ul>
            )
        } else {
            listItem = (
                <ul class="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/login">Login</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/create_user_form"> Create Profile </a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/loan_categories"> Find Loans</a>
                    </li>
                </ul>
            )
        }
        setLoginOutButton(listItem)
    }, [])




    
    return (
        <Router>
            <nav className="navbar navbar-expand-sm navbar-light" id="nav">
                <a className="navbar-brand" href="/">
                    <img className="logo-phrase"
                        src="static/jpg/logo.png" 
                        width="80" 
                        height="80" 
                        class="d-inline-block" 
                        alt=""/>
                    InfoLoan!
                        
                </a> 
                <button className="navbar-toggler" type="button" data-toggle="collapse"  data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
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
                    <Route path="/map">
                        <MapContainer />
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
