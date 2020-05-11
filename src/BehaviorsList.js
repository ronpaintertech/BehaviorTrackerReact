import React from "react";

const BehaviorsList = (props) => {
  var listBehaviors = null;

  props.behaviors != null && props.behaviors.length > 0
    ? (listBehaviors = props.behaviors.map((behavior) => (
        <tr key={behavior.id}>
          <td>{behavior.name}</td>
          <td>
            <button onClick={() => props.editBehavior(behavior)}>Edit</button>
            <button onClick={() => props.deleteBehavior(behavior.id)}>
              Delete
            </button>
          </td>
        </tr>
      )))
    : (listBehaviors = (
        <tr>
          <td colSpan="4">No Behaviors</td>
        </tr>
      ));

  return (
    <div className="MaintList">
      <table>
        <caption>Behaviors</caption>
        <thead>
          <tr>
            <th width="50%">Name</th>
            <th colSpan="2">&nbsp;</th>
          </tr>
        </thead>
        <tbody>{listBehaviors}</tbody>
      </table>
    </div>
  );
};

export default BehaviorsList;
