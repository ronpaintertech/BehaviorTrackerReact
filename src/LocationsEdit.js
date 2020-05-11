import React from "react";

const LocationsEdit = (props) => {
  return (
    <form onSubmit={props.updateLocation}>
      <div>
        <div className="row">
          <div className="col-25">
            <label>Location Name: </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="name"
              value={props.name}
              onChange={props.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label>Counted in Monthly Report: </label>
          </div>
          <div className="col-75">
            <input
              type="checkbox"
              name="isCounted"
              checked={props.isCounted}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className="btnSubmit">
          <button>Update</button>
          <button onClick={props.cancelUpdateLocation}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default LocationsEdit;
