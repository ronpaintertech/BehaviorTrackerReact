import React from "react";
import TrackerService from "./TrackerService";
import PersonService from "./PersonService";
import TrackerBehaviorTable from "./TrackerBehaviorTable";

class Tracker extends React.Component {
  constructor() {
    super();
    this.trackerService = new TrackerService();
    this.personService = new PersonService();
    this.allPersons = null;

    this.state = {
      personLocations: null,
      personBehaviors: null,
      personBehaviorCounts: null,
      id: 0,
      trackdate: "",
      personid: 0,
      locationid: 0,
      behaviorid: 0,
      behcount: 0,
    };
  }

  async componentDidMount() {
    this.allPersons = await this.personService.retrievePersons();

    const today = new Date();
    const tdate = this.formatDate(today);
    this.setState({ trackdate: tdate });

    // set locations and behaviors of first person
    if (this.allPersons != null && this.allPersons.length > 0) {
      this.setState({ personid: this.allPersons[0].id });
      this.getPersonLocations(this.allPersons[0].id);
      this.getPersonBehaviors(tdate, this.allPersons[0].id);
    }
  }

  formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  getPersonLocations = async (persid) => {
    const items = await this.personService.retrievePersonLocations(persid);

    var firstlocid = 0;
    // set locationid to first location
    if (items != null && items.length > 0) {
      firstlocid = items[0].locationid;
    }

    this.setState({
      personLocations: items,
      locationid: firstlocid,
    });
  };

  getPersonBehaviors = async (trackdt, persid) => {
    const behaviors = await this.personService.retrievePersonBehaviors(persid);
    const behaviorcounts = await this.getPersonBehaviorCounts(
      trackdt,
      behaviors
    );

    this.setState({
      personBehaviors: behaviors,
      personBehaviorCounts: behaviorcounts,
    });
  };

  getPersonBehaviorCounts = async (trackdt, items) => {
    var pbCnts = [];

    for (const item of items) {
      var tdate = trackdt.replace(/-/g, "");
      var pbtid = 0;
      var pbc = 0;

      const behaviorcounts = await this.trackerService.retrieveTrackBehavior(
        tdate,
        this.state.personid,
        this.state.locationid,
        item.behaviorid
      );

      console.log("getPersonBehaviorCounts");
      console.log(behaviorcounts);

      if (behaviorcounts != null && behaviorcounts.length > 0) {
        console.log("getPersonBehaviorCounts: behcount");
        console.log(behaviorcounts[0].behcount);
        pbtid = behaviorcounts[0].id;
        pbc = behaviorcounts[0].behcount;
      }

      pbCnts.push({ id: pbtid, behaviorid: item.behaviorid, pbcount: pbc });
    }
    console.log("getPersonBehaviorCounts: pbcnts");
    console.log(pbCnts);

    return pbCnts;
  };

  handleInputChange = (event) => {
    const target = event.target;
    const key = target.name;
    const value = target.value;

    if (key === "trackdate") {
      //      this.getPersonLocations(this.state.personid);
      this.getPersonBehaviors(value, this.state.personid);
    }

    if (key === "personid") {
      this.getPersonLocations(value);
      this.getPersonBehaviors(this.state.trackdate, value);
    }

    if (key === "locationid") {
      this.getPersonBehaviors(this.state.trackdate, this.state.personid);
    }

    this.setState({
      [key]: value,
    });
  };

  handleIncrement = (event, pbcounter) => {
    event.preventDefault();
    const pbcounters = [...this.state.personBehaviorCounts];
    const index = pbcounters.indexOf(pbcounter);
    pbcounters[index] = { ...pbcounter };
    pbcounters[index].pbcount++;
    this.updTrackBehavior(pbcounters[index]);
    this.setState({ personBehaviorCounts: pbcounters });
  };

  handleDecrement = (event, pbcounter) => {
    event.preventDefault();
    if (pbcounter.pbcount > 0) {
      const pbcounters = [...this.state.personBehaviorCounts];
      const index = pbcounters.indexOf(pbcounter);
      pbcounters[index] = { ...pbcounter };
      pbcounters[index].pbcount--;
      this.updTrackBehavior(pbcounters[index]);
      this.setState({ personBehaviorCounts: pbcounters });
    }
  };

  updTrackBehavior = async (trackbehaviorcount) => {
    console.log("updTrackBehavior");
    console.log(trackbehaviorcount);
    var newTB = {};

    newTB.id = trackbehaviorcount.id;
    newTB.trackdate = this.state.trackdate + "T04:00:00Z[UTC]";
    newTB.personid = this.state.personid;
    newTB.locationid = this.state.locationid;
    newTB.behaviorid = trackbehaviorcount.behaviorid;
    newTB.behcount = trackbehaviorcount.pbcount;
    console.log(newTB);

    if (trackbehaviorcount.id > 0) {
      await this.trackerService.updateTrackBehavior(
        trackbehaviorcount.id,
        newTB
      );
    } else {
      await this.trackerService.addTrackBehavior(newTB);
      await this.getPersonBehaviors(newTB.trackdate, newTB.personid);
    }
  };

  render() {
    const { personBehaviors, personBehaviorCounts } = this.state;

    const listAllPersons =
      this.allPersons != null && this.allPersons.length > 0 ? (
        this.allPersons.map((person) => (
          <option key={person.id} value={person.id}>
            {person.lastname}, {person.firstname}
          </option>
        ))
      ) : (
        <option value="">No persons</option>
      );

    const listPersonLocations =
      this.state.personLocations != null &&
      this.state.personLocations.length > 0 ? (
        this.state.personLocations.map((personlocation) => (
          <option
            key={personlocation.locationid}
            value={personlocation.locationid}
          >
            {personlocation.name}
          </option>
        ))
      ) : (
        <option value="">No locations</option>
      );

    return (
      <div className="Content">
        <div className="row">
          <form width="100%">
            <div className="row">
              <div className="col-25">
                <label htmlFor="trackdate">Date: </label>
              </div>
              <div className="col-75">
                <input
                  type="date"
                  name="trackdate"
                  value={this.state.trackdate}
                  onChange={this.handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="personid">Person: </label>
              </div>
              <div className="col-75">
                <select
                  value={this.state.personid}
                  name="personid"
                  onChange={this.handleInputChange}
                >
                  {listAllPersons}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-25">
                <label htmlFor="locationid">Location: </label>
              </div>
              <div className="col-75">
                <select
                  value={this.state.locationid}
                  name="locationid"
                  onChange={this.handleInputChange}
                >
                  {listPersonLocations}
                </select>
              </div>
            </div>
            <TrackerBehaviorTable
              personBehaviors={personBehaviors}
              personBehaviorCounts={personBehaviorCounts}
              handleIncrement={this.handleIncrement}
              handleDecrement={this.handleDecrement}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Tracker;
