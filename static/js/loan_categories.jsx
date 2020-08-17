
const Router = ReactRouterDOM.BrowserRouter;
const Switch = ReactRouterDOM.Switch;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Redirect = ReactRouterDOM.Redirect;

function CategoryLoanContainer(props){
    return (
        <div className="categories">
            <p>Category Name: {props.name}</p>
        </div>
    );
}

function CategoryContainer() { 
    const [categories, setCategories] = React.useState(["loading..."])
    React.useEffect(() => {
        fetch('/loan_categories.json')
        .then((response) => response.json())
        .then((data) => {
            const categoryData = []
            for (const category of data) {
                console.log(category)
                categoryData.push(
                    <div>{category}</div>
                )
            }
            setCategories(categoryData)
        })
    }, [])

    return (
    <div>
        <div>{categories}</div>
        <Router>
        <p><Link to="/create_profile"> For more information click here </Link></p>
        <Switch>
        <Route path="/create_profile"></Route>
        </Switch>
        </Router>
    </div>
    );
}
ReactDOM.render(<CategoryContainer />, document.getElementById('loan_categories'));