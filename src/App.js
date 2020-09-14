import React from "react";
import { HashRouter as Router, Link, Route } from "react-router-dom";
import Home from './pages/Home';
import Characters from './pages/Characters';


class Navbar extends React.Component {

  render() {
    return (
      <Router basename='/'>
        <div id="navbar">
          <nav className="navbar navbar-expand-lg navbar-light" style={{'background-color': '#e3f2fd'}}>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav mr-auto">

            <li className='nav-link'><Link to="/">Home</Link></li>
            <li className='nav-link'><Link to="/characters">Characters</Link></li>


              </ul>
            </div>
          </nav>
          <div className="container-fluid mt-2">
          <Route exact path="/" component={Home} />
          </div>
          <div className="container-fluid mt-2">
          <Route path="/characters" component={Characters} />
          </div>
        </div>
      </Router>
    )
  }
}


function App(props) {
  return (
    <Navbar />
  );
}

export default App;