import React from "react";
import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="Nav">
      <ul>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/tracker">
            Behavior Tracker
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/monthly">
            Monthly Report
          </NavLink>
        </li>
        <li>--- Maintenance ---</li>
        <li>
          <NavLink exact to="/person">
            Person
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/locations">
            Locations
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/behaviors">
            Behaviors
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
