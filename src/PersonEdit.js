import React from "react";

const PersonEdit = (props) => {
  return (
    <div id="form">
      <form onSubmit={props.updatePerson}>
        <div className="row">
          <div className="col-25">
            <label htmlFor="lastname">Last Name: </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="lastname"
              value={props.lastname}
              onChange={props.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="firstname">First Name: </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="firstname"
              value={props.firstname}
              onChange={props.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="middlename">Middle Name: </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="middlename"
              value={props.middlename}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="age">Age: </label>
          </div>
          <div className="col-75">
            <input
              type="number"
              name="age"
              value={props.age}
              onChange={props.handleInputChange}
            />
          </div>
        </div>
        <div className="btnSubmit">
          <button>Update</button>
          <button onClick={props.cancelUpdatePerson}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default PersonEdit;
