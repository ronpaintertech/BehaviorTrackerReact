import React from "react";

const BehaviorsAdd = (props) => {
  return (
    <form onSubmit={props.addBehavior}>
      <div>
        <div className="row">
          <div className="col-25">
            <label htmlFor="name">Behavior Name: </label>
          </div>
          <div className="col-75">
            <input
              type="text"
              name="name"
              placeholder="Enter a new behavior..."
              value={props.name}
              onChange={props.handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <button className="btnSubmit">Add Behavior</button>
        </div>
      </div>
    </form>
  );
};

export default BehaviorsAdd;
