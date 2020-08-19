const Router = ReactRouterDOM.BrowserRouter;
const Switch = ReactRouterDOM.Switch;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Redirect = ReactRouterDOM.Redirect;

function CarLoans(props){
    return(
        <div className="car_loans">
            <p>Category Name: {props.name}</p>
        </div>
    );
}

function CarLoanContainer(){
    const [category_name, setCarLoans] = React.useState(["loading..."])
    React.useEffect(() => {
        fetch('/car_loans.json')
        .then((response) => response.json())
        .then((data) => {
            const carLoans = []
            for (const car of data) {
                if (car === "Car loan") {
                    console.log(car)
                    carLoans.push(
                        <div>{car}</div>
                    )
                }
                setCarLoans(carLoans)
                }
            })
        }, [])

    return (

        <div>{category_name}</div>
        
    );
}

ReactDOM.render(<CarLoanContainer />, document.getElementById('root'));
    

