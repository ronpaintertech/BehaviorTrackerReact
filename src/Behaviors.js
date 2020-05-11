import React from "react";
import BehaviorsService from "./BehaviorsService";
import BehaviorsList from "./BehaviorsList";
import BehaviorsAdd from "./BehaviorsAdd";
import BehaviorsEdit from "./BehaviorsEdit";

class Behaviors extends React.Component {
  constructor() {
    super();
    this.behaviorsService = new BehaviorsService();
    this.state = {
      behaviors: [],
      editing: false,
      id: 0,
      name: "",
    };
  }

  async componentDidMount() {
    await this.getBehaviors();
  }

  getBehaviors = async () => {
    const items = await this.behaviorsService.retrieveBehaviors();
    this.setState({ behaviors: items });
  };

  handleInputChange = (event) => {
    const target = event.target;
    const key = target.name;
    const value = target.value;

    this.setState({
      [key]: value,
    });
  };

  setEditing = (edt) => {
    this.setState({
      editing: edt,
    });
  };

  addBehavior = async (event) => {
    event.preventDefault();
    var addBeh = {};
    addBeh.name = this.state.name;
    await this.behaviorsService.insertBehavior(addBeh);
    await this.getBehaviors();
    this.clearBehavior();
  };

  edtBehavior = (beh) => {
    this.setState({
      id: beh.id,
      name: beh.name,
    });
    this.setEditing(true);
  };

  updBehavior = async (event) => {
    event.preventDefault();
    this.setEditing(false);
    var updBeh = {};
    updBeh.id = this.state.id;
    updBeh.name = this.state.name;
    await this.behaviorsService.updateBehavior(updBeh);
    await this.getBehaviors();
    this.clearBehavior();
  };

  cancelUpdBehavior = (event) => {
    event.preventDefault();
    this.setEditing(false);
    this.clearBehavior();
  };

  delBehavior = async (behID) => {
    await this.behaviorsService.deleteBehavior(behID);
    this.getBehaviors();
  };

  clearBehavior = () => {
    this.setState({
      id: 0,
      name: "",
    });
  };

  render() {
    const { id, name, behaviors, editing } = this.state;
    return (
      <div className="Content">
        <div>
          <BehaviorsList
            behaviors={behaviors}
            editBehavior={this.edtBehavior}
            deleteBehavior={this.delBehavior}
          />
        </div>
        <div>
          {editing ? (
            <BehaviorsEdit
              id={id}
              name={name}
              handleInputChange={this.handleInputChange}
              setEditing={this.setEditing}
              updateBehavior={this.updBehavior}
              cancelUpdateBehavior={this.cancelUpdBehavior}
            />
          ) : (
            <BehaviorsAdd
              name={name}
              handleInputChange={this.handleInputChange}
              addBehavior={this.addBehavior}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Behaviors;
