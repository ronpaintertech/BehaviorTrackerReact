import React from "react";
import PersonService from "./PersonService";
import PersonList from "./PersonList";
import PersonAdd from "./PersonAdd";
import PersonEdit from "./PersonEdit";
import PersonLocationsList from "./PersonLocationsList";
import LocationsService from "./LocationsService";
import PersonBehaviorsList from "./PersonBehaviorsList";
import BehaviorsService from "./BehaviorsService";

class Person extends React.Component {
  constructor() {
    super();
    this.personService = new PersonService();
    this.locationsService = new LocationsService();
    this.behaviorsService = new BehaviorsService();
    this.allLocations = null;
    this.allBehaviors = null;

    this.state = {
      action: "Add",
      persons: [],
      id: 0,
      lastname: "",
      firstname: "",
      middlename: "",
      age: 0,
      person: {},
      locationid: 0,
      personlocations: [],
      behaviorid: 0,
      personbehaviors: [],
    };
  }

  async componentDidMount() {
    await this.getPersons();
    this.allLocations = await this.locationsService.retrieveLocations();
    this.allBehaviors = await this.behaviorsService.retrieveBehaviors();
  }

  getPersons = async () => {
    const items = await this.personService.retrievePersons();
    this.setState({ persons: items });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const key = target.name;
    const value = target.value;

    this.setState({
      [key]: value,
    });
  };

  setAction = (act) => {
    this.setState({
      action: act,
    });
  };

  addPerson = async (event) => {
    event.preventDefault();
    var addPers = this.state.person;
    addPers.lastname = this.state.lastname;
    addPers.firstname = this.state.firstname;
    addPers.middlename = this.state.middlename;
    addPers.age = this.state.age;
    await this.personService.insertPerson(addPers);
    await this.getPersons();
    this.clearPerson();
  };

  edtPerson = (pers) => {
    this.setState({
      id: pers.id,
      lastname: pers.lastname,
      firstname: pers.firstname,
      middlename: pers.middlename,
      age: pers.age,
    });
    this.setAction("Edit");
  };

  updPerson = async (event) => {
    event.preventDefault();
    var updPers = {};
    updPers.id = this.state.id;
    updPers.lastname = this.state.lastname;
    updPers.firstname = this.state.firstname;
    updPers.middlename = this.state.middlename;
    updPers.age = this.state.age;
    await this.personService.updatePerson(updPers);
    await this.getPersons();
    this.clearPerson();
    this.setAction("Add");
  };

  cancelUpdPerson = (event) => {
    event.preventDefault();
    this.setAction("Add");
    this.clearPerson();
  };

  delPerson = async (persID) => {
    await this.personService.deletePerson(persID);
    this.getPersons();
    this.clearPerson();
    this.setAction("Add");
  };

  clearPerson = () => {
    this.setState({
      id: 0,
      lastname: "",
      firstname: "",
      middlename: "",
      age: 0,
    });
  };

  dispPersonLocations = async (pers) => {
    await this.getPersonLocations(pers.id);
    this.setState({ person: pers });
    this.setAction("Locations");
  };

  getPersonLocations = async (persID) => {
    const locitems = await this.personService.retrievePersonLocations(persID);
    this.setState({ personlocations: locitems });
  };

  addPersonLocation = async (persID, locID) => {
    var addLoc = {};
    addLoc.personid = persID;
    addLoc.locationid = locID;
    await this.personService.insertPersonLocation(addLoc);
    await this.getPersonLocations(persID);
    this.setState({ locationid: 0 });
  };

  cancelPersonLocation = (event) => {
    event.preventDefault();
    this.clearPersonLocations();
    this.setAction("Add");
  };

  delPersonLocation = async (persID, locID) => {
    var delLoc = {};
    delLoc.personid = persID;
    delLoc.locationid = locID;
    await this.personService.deletePersonLocation(delLoc);
    await this.getPersonLocations(persID);
  };

  clearPersonLocations = () => {
    this.setState({
      person: {},
      locationid: 0,
      personlocations: [],
    });
  };

  dispPersonBehaviors = async (pers) => {
    await this.getPersonBehaviors(pers.id);
    this.setState({ person: pers });
    this.setAction("Behaviors");
  };

  getPersonBehaviors = async (persID) => {
    const behitems = await this.personService.retrievePersonBehaviors(persID);
    this.setState({ personbehaviors: behitems });
  };

  addPersonBehavior = async (persID, behID) => {
    var addBeh = {};
    addBeh.personid = persID;
    addBeh.behaviorid = behID;
    await this.personService.insertPersonBehavior(addBeh);
    await this.getPersonBehaviors(persID);
    this.setState({ behaviorid: 0 });
  };

  cancelPersonBehavior = (event) => {
    event.preventDefault();
    this.clearPersonBehaviors();
    this.setAction("Add");
  };

  delPersonBehavior = async (persID, behID) => {
    var delBeh = {};
    delBeh.personid = persID;
    delBeh.behaviorid = behID;
    await this.personService.deletePersonBehavior(delBeh);
    await this.getPersonBehaviors(persID);
  };

  clearPersonBehaviors = () => {
    this.setState({
      person: {},
      behaviorid: 0,
      personbehaviors: [],
    });
  };

  render() {
    const {
      action,
      persons,
      id,
      lastname,
      firstname,
      middlename,
      age,
      person,
      locationid,
      personlocations,
      behaviorid,
      personbehaviors,
    } = this.state;

    var actionComponent = null;
    switch (action) {
      case "Edit":
        actionComponent = (
          <PersonEdit
            id={id}
            lastname={lastname}
            firstname={firstname}
            middlename={middlename}
            age={age}
            handleInputChange={this.handleInputChange}
            updatePerson={this.updPerson}
            cancelUpdatePerson={this.cancelUpdPerson}
          />
        );
        break;
      case "Locations":
        actionComponent = (
          <PersonLocationsList
            person={person}
            locationid={locationid}
            personlocations={personlocations}
            allLocations={this.allLocations}
            handleInputChange={this.handleInputChange}
            addPersonLocation={this.addPersonLocation}
            deletePersonLocation={this.delPersonLocation}
            cancelPersonLocation={this.cancelPersonLocation}
          />
        );
        break;
      case "Behaviors":
        actionComponent = (
          <PersonBehaviorsList
            person={person}
            behaviorid={behaviorid}
            personbehaviors={personbehaviors}
            allBehaviors={this.allBehaviors}
            handleInputChange={this.handleInputChange}
            addPersonBehavior={this.addPersonBehavior}
            deletePersonBehavior={this.delPersonBehavior}
            cancelPersonBehavior={this.cancelPersonBehavior}
          />
        );
        break;
      default:
        actionComponent = (
          <PersonAdd
            lastname={lastname}
            firstname={firstname}
            middlename={middlename}
            age={age}
            handleInputChange={this.handleInputChange}
            addPerson={this.addPerson}
          />
        );
    }
    return (
      <div className="Content">
        <PersonList
          persons={persons}
          displayPersonLocations={this.dispPersonLocations}
          displayPersonBehaviors={this.dispPersonBehaviors}
          editPerson={this.edtPerson}
          deletePerson={this.delPerson}
        />
        {actionComponent}
      </div>
    );
  }
}

export default Person;
