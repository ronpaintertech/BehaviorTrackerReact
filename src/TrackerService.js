class TrackerService {
  BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.trackbehavior";
  MONTHLY_REPORT_BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.monthlyreport";

  async retrieveTrackBehavior(tdate, pid, lid, bid) {
    const TB_URL =
      this.BASE_URL +
      "/trackdate/" +
      tdate +
      "/person/" +
      pid +
      "/location/" +
      lid +
      "/behavior/" +
      bid;

    console.log("retrieveTrackBehavior");
    console.log(TB_URL);

    try {
      const response = await fetch(TB_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("retrieveTrackBehavior: json");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  async addTrackBehavior(data) {
    console.log("addTrackBehavior");
    console.log(data);
    return fetch(this.BASE_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.text();
    });
  }

  async updateTrackBehavior(id, data) {
    console.log("updateTrackBehavior");
    console.log(id);
    console.log(data);
    const TB_UPDATE_URL = this.BASE_URL + "/" + id;
    console.log(TB_UPDATE_URL);
    return fetch(TB_UPDATE_URL, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.text();
    });
  }

  async retrieveMonthlyReport(pid, sdate, edate) {
    const MR_URL =
      this.MONTHLY_REPORT_BASE_URL +
      "/personid/" +
      pid +
      "/startdate/" +
      sdate +
      "/enddate/" +
      edate;

    console.log("retrieveTrackBehavior");
    console.log(MR_URL);

    try {
      const response = await fetch(MR_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("retrieveTrackBehavior: json");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default TrackerService;
