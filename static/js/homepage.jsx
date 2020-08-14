function Homepage() {
  return (
    <React.Fragment>
        <p> Confuse about loans? This is a great website to view your loan options! </p>

        <a href='/loan_categories'>
          Click here to view more info
        </a>

    </React.Fragment>
    
  ); 
}

ReactDom.render(<Homepage />, document.getElementById('app'));