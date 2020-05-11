import React from "react";

const TrackerBehaviorTable = (props) => {
  // if (personBehaviorCounts != null) {
  console.log("TBT props");
  console.log(props.personBehaviors);
  //   console.log(nextProps.personBehaviors.length);
  console.log(props.personBehaviorCounts);
  //   console.log(nextProps.personBehaviorCounts.length);
  // }

  const listPersonBehaviors =
    props.personBehaviors != null &&
    props.personBehaviors.length > 0 &&
    props.personBehaviorCounts != null &&
    props.personBehaviorCounts.length > 0 ? (
      props.personBehaviors.map((personbehavior, idx) => (
        <tr key={personbehavior.behaviorid}>
          <td>{personbehavior.name}</td>
          <td>
            {props.personBehaviorCounts[idx].pbcount}
            &nbsp;
            <button
              onClick={(e) =>
                props.handleIncrement(e, props.personBehaviorCounts[idx])
              }
            >
              +
            </button>
            <button
              onClick={(e) =>
                props.handleDecrement(e, props.personBehaviorCounts[idx])
              }
            >
              -
            </button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td>No Behaviors</td>
        <td>&nbsp;</td>
      </tr>
    );

  return (
    <div className="MaintList">
      <table key={props.updateTable}>
        <caption>Behaviors</caption>
        <thead>
          <tr>
            <th width="75%">Name</th>
            <th width="25%">&nbsp;</th>
          </tr>
        </thead>
        <tbody>{listPersonBehaviors}</tbody>
      </table>
    </div>
  );
};

export default TrackerBehaviorTable;
