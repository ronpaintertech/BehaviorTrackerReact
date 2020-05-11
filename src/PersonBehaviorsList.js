import React from "react";

const PersonBehaviorsList = (props) => {
  var listBehaviors = null;

  props.personbehaviors != null && props.personbehaviors.length > 0
    ? (listBehaviors = props.personbehaviors.map((personbehavior) => (
        <tr key={personbehavior.pbid}>
          <td>{personbehavior.name}</td>
          <td>
            <button
              onClick={() =>
                props.deletePersonBehavior(
                  personbehavior.personid,
                  personbehavior.behaviorid
                )
              }
            >
              Delete
            </button>
          </td>
        </tr>
      )))
    : (listBehaviors = (
        <tr key={0}>
          <td colSpan="4">No Behaviors</td>
        </tr>
      ));

  var listAllBehaviors = null;

  props.allBehaviors.length > 0
    ? (listAllBehaviors = props.allBehaviors.map((behavior) => (
        <option key={behavior.id} value={behavior.id}>
          {behavior.name}
        </option>
      )))
    : (listAllBehaviors = (
        <option key={0} value="">
          No behaviors
        </option>
      ));

  const addBehavior = (
    <tr>
      <td>
        <select
          key="PBS"
          name="behaviorid"
          value={props.behaviorid}
          onChange={props.handleInputChange}
        >
          <option key={"PBS0"} value={0} disabled hidden>
            Choose a behavior...
          </option>
          {listAllBehaviors}
        </select>
      </td>
      <td>
        <button
          onClick={() =>
            props.addPersonBehavior(props.person.id, props.behaviorid)
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
        <caption>{props.person.firstname}'s Behaviors</caption>
        <thead>
          <tr>
            <th width="75%">Name</th>
            <th width="25%">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {listBehaviors}
          {addBehavior}
        </tbody>
      </table>
      <button onClick={props.cancelPersonBehavior}>Cancel</button>
    </div>
  );
};

export default PersonBehaviorsList;
