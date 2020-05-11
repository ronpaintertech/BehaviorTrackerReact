import React from "react";

const LocationsList = (props) => {
  var listLocations = null;

  props.locations != null && props.locations.length > 0
    ? (listLocations = props.locations.map((location) => (
        <tr key={location.id}>
          <td>{location.name}</td>
          <td>{location.isCounted ? "yes" : "no"}</td>
          <td>
            <button onClick={() => props.editLocation(location)}>Edit</button>
            <button onClick={() => props.deleteLocation(location.id)}>
              Delete
            </button>
          </td>
        </tr>
      )))
    : (listLocations = (
        <tr>
          <td colSpan="3">No Locations</td>
        </tr>
      ));

  return (
    <div className="MaintList">
      <table>
        <caption>Locations</caption>
        <thead>
          <tr>
            <th width="50%">Name</th>
            <th width="25%">Counted in Monthly Report</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>{listLocations}</tbody>
      </table>
    </div>
  );
};

export default LocationsList;
