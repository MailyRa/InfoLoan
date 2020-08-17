const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;


function Homepage() {
    return <div>Welcome to InfoLoan!</div>
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
                            <Link to="/loan_categories"> Click here for more information! </Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/">
                        <Homepage />
                    </Route>
                    <Route path="/login">
                    </Route> 
                    <Route path="/loan_categories">
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))


