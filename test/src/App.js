import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Case01_React from "./cases/01_react_logo/Case01_React";
import Case01_Paper from "./cases/01_react_logo/Case01_Paper";

import Case02_React from "./cases/02_position/Case02_React";
import Case02_Paper from "./cases/02_position/Case02_Paper";
import Case02_Paper_update from "./cases/02_position/Case02_Paper_update";
import Case02_React_update from "./cases/02_position/Case02_React_update";

import Case03_React from "./cases/03_pivot/Case03_React";
import Case03_Paper from "./cases/03_pivot/Case03_Paper";
import Case03_React_update from "./cases/03_pivot/Case03_React_update";
import Case03_Paper_update from "./cases/03_pivot/Case03_Paper_update";

import Case04_React from "./cases/04_rotation/Case04_React";
import Case04_Paper from "./cases/04_rotation/Case04_Paper";
import Case04_React_update from "./cases/04_rotation/Case04_React_update";
import Case04_Paper_update from "./cases/04_rotation/Case04_Paper_update";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/1/paper" component={Case01_Paper}/>
          <Route exact path="/1/react" component={Case01_React}/>

          <Route exact path="/2/paper" component={Case02_Paper}/>
          <Route exact path="/2/react" component={Case02_React}/>
          <Route exact path="/2/paper/update" component={Case02_Paper_update}/>
          <Route exact path="/2/react/update" component={Case02_React_update}/>

          <Route exact path="/3/paper" component={Case03_Paper}/>
          <Route exact path="/3/react" component={Case03_React}/>
          <Route exact path="/3/paper/update" component={Case03_Paper_update}/>
          <Route exact path="/3/react/update" component={Case03_React_update}/>

          <Route exact path="/4/paper" component={Case04_Paper}/>
          <Route exact path="/4/react" component={Case04_React}/>
          <Route exact path="/4/paper/update" component={Case04_Paper_update}/>
          <Route exact path="/4/react/update" component={Case04_React_update}/>
        </div>
      </Router>
    );
  }
}

export default App;
