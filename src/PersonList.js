import React from "react";

const PersonsList = (props) => {
  var listPersons = null;

  props.persons.length > 0
    ? (listPersons = props.persons.map((person) => (
        <tr key={person.id}>
          <td>{person.lastname}</td>
          <td>{person.firstname}</td>
          <td>{person.middlename}</td>
          <td>{person.age}</td>
          <td>
            <button onClick={() => props.editPerson(person)}>
              Edit Person
            </button>
            <button onClick={() => props.displayPersonLocations(person)}>
              Locations
            </button>
            <button onClick={() => props.displayPersonBehaviors(person)}>
              Behaviors
            </button>
          </td>
          <td>
            <button onClick={() => props.deletePerson(person.id)}>
              Delete Person
            </button>
          </td>
        </tr>
      )))
    : (listPersons = (
        <tr>
          <td colSpan="4">No Persons</td>
        </tr>
      ));

  return (
    <div className="MaintList">
      <table>
        <caption>Persons</caption>
        <thead>
          <tr>
            <th width="20%">Last Name</th>
            <th width="20%">First Name</th>
            <th width="15%">Middle Name</th>
            <th width="5%">Age</th>
            <th width="25%">&nbsp;</th>
            <th width="15%">&nbsp;</th>
          </tr>
        </thead>
        <tbody>{listPersons}</tbody>
      </table>
    </div>
  );
};

export default PersonsList;
