import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Case01_React from "./cases/Case01_React";
import Case01_Paper from "./cases/Case01_Paper";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/1/react" component={Case01_React}/>
          <Route path="/1/paper" component={Case01_Paper}/>
        </div>
      </Router>
    );
  }
}

export default App;
