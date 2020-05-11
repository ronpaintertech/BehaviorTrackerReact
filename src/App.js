import React from "react";
import "./App.css";
import Nav from "./Nav";
import Home from "./Home";
import Locations from "./Locations";
import Behaviors from "./Behaviors";
import Person from "./Person";
import Tracker from "./Tracker";
import TrackerMonthlyReport from "./TrackerMonthlyReport";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/tracker" component={Tracker} />
        <Route exact path="/monthly" component={TrackerMonthlyReport} />
        <Route exact path="/person" component={Person} />
        <Route exact path="/locations" component={Locations} />
        <Route exact path="/behaviors" component={Behaviors} />
      </Switch>
    </Router>
  );
}

export default App;
