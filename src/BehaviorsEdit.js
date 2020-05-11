import React from "react";

const BehaviorsEdit = (props) => {
  return (
    <form onSubmit={props.updateBehavior}>
      <div>
        <div className="row">
          <div className="col-25">
            <label>Behavior Name: </label>
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
        <div className="btnSubmit">
          <button>Update</button>
          <button onClick={props.cancelUpdateBehavior}>Cancel</button>
        </div>
      </div>
    </form>
  );
};

export default BehaviorsEdit;
