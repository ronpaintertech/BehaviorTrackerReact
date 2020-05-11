import React from "react";
import LocationsService from "./LocationsService";
import LocationsList from "./LocationsList";
import LocationsAdd from "./LocationsAdd";
import LocationsEdit from "./LocationsEdit";

class Locations extends React.Component {
  constructor() {
    super();
    this.locationsService = new LocationsService();
    this.state = {
      locations: [],
      editing: false,
      id: 0,
      name: "",
      isCounted: false,
    };
  }

  async componentDidMount() {
    await this.getLocations();
  }

  getLocations = async () => {
    const items = await this.locationsService.retrieveLocations();
    this.setState({ locations: items });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const key = target.name;
    const value = target.name === "isCounted" ? target.checked : target.value;

    this.setState({
      [key]: value,
    });
  };

  setEditing = (edt) => {
    this.setState({
      editing: edt,
    });
  };

  addLocation = async (event) => {
    event.preventDefault();
    var addLoc = {};
    addLoc.name = this.state.name;
    addLoc.isCounted = this.state.isCounted;
    await this.locationsService.insertLocation(addLoc);
    await this.getLocations();
    this.clearLocation();
  };

  edtLocation = (loc) => {
    this.setState({
      id: loc.id,
      name: loc.name,
      isCounted: loc.isCounted,
    });
    this.setEditing(true);
  };

  updLocation = async (event) => {
    event.preventDefault();
    this.setEditing(false);
    var updLoc = {};
    updLoc.id = this.state.id;
    updLoc.name = this.state.name;
    updLoc.isCounted = this.state.isCounted;
    await this.locationsService.updateLocation(updLoc);
    await this.getLocations();
    this.clearLocation();
  };

  cancelUpdLocation = (event) => {
    event.preventDefault();
    this.setEditing(false);
    this.clearLocation();
  };

  delLocation = async (locID) => {
    await this.locationsService.deleteLocation(locID);
    this.getLocations();
  };

  clearLocation = () => {
    this.setState({
      id: 0,
      name: "",
      isCounted: false,
    });
  };

  render() {
    const { id, name, isCounted, locations, editing } = this.state;
    return (
      <div className="Content">
        <div>
          <LocationsList
            locations={locations}
            editLocation={this.edtLocation}
            deleteLocation={this.delLocation}
          />
        </div>
        <div>
          {editing ? (
            <LocationsEdit
              id={id}
              name={name}
              isCounted={isCounted}
              handleInputChange={this.handleInputChange}
              setEditing={this.setEditing}
              updateLocation={this.updLocation}
              cancelUpdateLocation={this.cancelUpdLocation}
            />
          ) : (
            <LocationsAdd
              name={name}
              isCounted={isCounted}
              handleInputChange={this.handleInputChange}
              addLocation={this.addLocation}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Locations;
