import React from "react";

const LocationsAdd = (props) => {
  return (
    <form onSubmit={props.addLocation}>
      <div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="name">Location Name: </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="name"
              placeholder="Enter a new location..."
              value={props.name}
              onChange={props.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="isCounted">Count in Monthly Report: </label>
          </div>
          <div className="col-75">
            <input
              type="checkbox"
              name="isCounted"
              value={props.isCounted}
              checked={props.isCounted}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <button className="btnSubmit">Add Location</button>
        </div>
      </div>
    </form>
  );
};

export default LocationsAdd;
