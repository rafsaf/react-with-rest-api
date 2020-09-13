import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Home from './pages/Home';
import Dogs from './pages/Dogs';
import Persons from './pages/Persons';


function NavLink(props) {
  let liClass;

  if (props.pageUrl === props.current) {
    liClass = "nav-item ml-1 active";
  } else {
    liClass = "nav-item ml-1";
  };

  return (
    <li class={liClass}>
      <Link
        onClick={() => props.handleClick(props.pageUrl)}
        class='nav-link'
        to={props.pageUrl}>{props.name}
      </Link>
    </li>
  )
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    let currentPath = localStorage.getItem('current');
    if (currentPath === null) {
      currentPath = '/';
    }

    this.state = { current: currentPath };
    this.handleClick = this.handleClick.bind(this);
  }



  handleClick(url) {
    this.setState(
      { current: url }
    )
    localStorage.setItem('current', url);
  };

  render() {
    return (
      <Router>
        <div id="navbar">
          <nav class="navbar navbar-expand-lg navbar-light" style={{'background-color': '#e3f2fd'}}>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav mr-auto">

                <NavLink 
                handleClick={this.handleClick} 
                pageUrl='/' name='Home' 
                current={this.state.current} 
                />

                <NavLink handleClick={this.handleClick}
                 pageUrl='/persons' name='Persons' 
                 current={this.state.current} 
                 />

                <NavLink handleClick={this.handleClick}
                 pageUrl='/dogs' name='Dogs' 
                 current={this.state.current} 
                 />

              </ul>
            </div>
          </nav>
          <div class="container-fluid mt-2">
          <Route exact path="/" component={Home} />
          </div>
          <div class="container-fluid mt-2">
          <Route path="/persons" component={Persons} />
          </div>
          <div class="container-fluid mt-2">
          <Route path="/dogs" component={Dogs} />
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