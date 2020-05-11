import React from "react";

const PersonLocationsList = (props) => {
  var listLocations = null;

  props.personlocations != null && props.personlocations.length > 0
    ? (listLocations = props.personlocations.map((personlocation) => (
        <tr key={personlocation.plid}>
          <td>{personlocation.name}</td>
          <td>
            <button
              onClick={() =>
                props.deletePersonLocation(
                  personlocation.personid,
                  personlocation.locationid
                )
              }
            >
              Delete
            </button>
          </td>
        </tr>
      )))
    : (listLocations = (
        <tr key={0}>
          <td colSpan="4">No Locations</td>
        </tr>
      ));

  var listAllLocations = null;

  props.allLocations != null && props.allLocations.length > 0
    ? (listAllLocations = props.allLocations.map((location) => (
        <option key={location.id} value={location.id}>
          {location.name}
        </option>
      )))
    : (listAllLocations = (
        <option key={0} value="">
          No locations
        </option>
      ));

  const addLocation = (
    <tr>
      <td>
        <select
          key="PLS"
          name="locationid"
          value={props.locationid}
          onChange={props.handleInputChange}
        >
          <option key={"PLS0"} value={0} disabled hidden>
            Choose a location...
          </option>
          {listAllLocations}
        </select>
      </td>
      <td>
        <button
          onClick={() =>
            props.addPersonLocation(props.person.id, props.locationid)
          }
        >
          Add
        </button>
      </td>
    </tr>
  );

  return (
    <div className="MaintList">
      <table>
        <caption>{props.person.firstname}'s Locations</caption>
        <thead>
          <tr>
            <th width="75%">Name</th>
            <th width="25%">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listLocations}
          {addLocation}
        </tbody>
      </table>
      <button onClick={props.cancelPersonLocation}>Cancel</button>
    </div>
  );
};

export default PersonLocationsList;
