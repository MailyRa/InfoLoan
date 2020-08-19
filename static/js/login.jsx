


function LogIn() {
    return (
        <div>
            <form method="POST" action="/handle_login">
                Username: 
                <input type="text" name="email"></input>
                Password:
                <input type="password" name="password"></input>
                <button type="Submit"> Login </button>
            </form>
        </div>
    );
}

ReactDOM.render(<LogIn />, document.getElementById('root'));