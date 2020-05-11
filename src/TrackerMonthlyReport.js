import React from "react";
import TrackerService from "./TrackerService";
import PersonService from "./PersonService";

class TrackerMonthlyReport extends React.Component {
  constructor() {
    super();
    this.trackerService = new TrackerService();
    this.personService = new PersonService();

    this.state = {
      allPersons: null,
      monthlyReportItems: null,
      personid: 0,
      startdate: "",
      enddate: "",
      month: 0,
      year: 0,
    };
  }

  async componentDidMount() {
    const items = await this.personService.retrievePersons();
    console.log("trackermonthlyreport componentDidMount");
    console.log(items);

    this.setState({
      allPersons: items,
    });

    const today = new Date();
    this.setMonthStartEndDate(today.getMonth(), today.getFullYear());
    this.setState({
      month: today.getMonth(),
      year: today.getFullYear(),
    });

    // set locations and behaviors of first person
    if (items != null && items.length > 0) {
      this.setState({ personid: items[0].id });
    }

    this.getMonthlyReport();
  }

  async getMonthlyReport() {
    var mrsdate = this.state.startdate.replace(/-/g, "");
    var mredate = this.state.enddate.replace(/-/g, "");

    const mritems = await this.trackerService.retrieveMonthlyReport(
      this.state.personid,
      mrsdate,
      mredate
    );

    this.setState({
      monthlyReportItems: mritems,
    });
  }

  setMonthStartEndDate(mth, yr) {
    //    console.log("setMonthStartEndDate: " + mth + " " + yr);
    const sdate = this.formatDate(new Date(yr, mth, 1));
    const edate = this.formatDate(new Date(yr, mth + 1, 0));
    this.setState({
      startdate: sdate,
      enddate: edate,
    });
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

  handleInputChange = (event) => {
    const target = event.target;
    const key = target.name;
    var value = target.value;

    if (key === "personid") {
      // TODO:
      setTimeout(() => {
        this.getMonthlyReport();
      }, 500);
    }

    if (key === "month") {
      value = parseInt(value);
      this.setMonthStartEndDate(value, this.state.year);
      // TODO:
      setTimeout(() => {
        this.getMonthlyReport();
      }, 500);
    }

    if (key === "year") {
      value = parseInt(value);
      this.setMonthStartEndDate(this.state.month, value);
      // TODO:
      setTimeout(() => {
        this.getMonthlyReport();
      }, 500);
    }

    this.setState({
      [key]: value,
    });
  };

  render() {
    const { monthlyReportItems } = this.state;

    const listAllPersons =
      this.state.allPersons != null && this.state.allPersons.length > 0 ? (
        this.state.allPersons.map((person) => (
          <option key={person.id} value={person.id}>
            {person.lastname}, {person.firstname}
          </option>
        ))
      ) : (
        <option value="">No persons</option>
      );

    const listMonths = [];

    for (var i = 0; i <= 11; i++) {
      listMonths.push(
        <option key={i} value={i}>
          {i + 1}
        </option>
      );
    }

    const listYears = [];
    listYears.push(
      <option key={"year2020"} value={2020}>
        2020
      </option>
    );
    listYears.push(
      <option key={"year2021"} value={2021}>
        2021
      </option>
    );

    const listReport =
      monthlyReportItems != null && monthlyReportItems.length > 0 ? (
        monthlyReportItems.map((item) => (
          <tr key={item.behname}>
            <td>{item.behname}</td>
            <td>{item.sumbehcount}</td>
          </tr>
        ))
      ) : (
        <tr key={"monthlyreport0"}>
          <td>No Behaviors</td>
          <td>&nbsp;</td>
        </tr>
      );

    return (
      <div className="Content">
        <h1>Monthly Report</h1>
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
            <label>Month/Year: </label>
          </div>
          <div className="col-75">
            <select
              value={this.state.month}
              name="month"
              onChange={this.handleInputChange}
            >
              {listMonths}
            </select>
            <select
              value={this.state.year}
              name="year"
              onChange={this.handleInputChange}
            >
              {listYears}
            </select>
          </div>
        </div>
        <div className="MaintList">
          <table>
            <caption>Behaviors</caption>
            <thead>
              <tr>
                <th width="75%">Name</th>
                <th width="25%">Total Count</th>
              </tr>
            </thead>
            <tbody>{listReport}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TrackerMonthlyReport;
