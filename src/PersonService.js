class PersonsService {
  BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.person";
  PL_BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.personlocation";
  PL_VW_BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.vwpersonlocations";
  PB_BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.personbehavior";
  PB_VW_BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.vwpersonbehaviors";

  async retrievePersons() {
    const PERSON_URL = this.BASE_URL;
    try {
      const response = await fetch(PERSON_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("from retrievePersons");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  async insertPerson(data) {
    const PERSON_INSERT_URL = this.BASE_URL;
    return fetch(PERSON_INSERT_URL, {
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

  async updatePerson(data) {
    const PERSON_UPDATE_URL = this.BASE_URL + "/" + data.id;
    return fetch(PERSON_UPDATE_URL, {
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

  async deletePerson(id) {
    const PERSON_DELETE_URL = this.BASE_URL + "/" + id;
    return fetch(PERSON_DELETE_URL, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.text();
    });
  }

  async retrievePersonLocations(persID) {
    const PERSON_LOCATIONS_URL = this.PL_VW_BASE_URL + "/personid/" + persID;
    console.log(PERSON_LOCATIONS_URL);
    try {
      const response = await fetch(PERSON_LOCATIONS_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("from retrievePersonLocations");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  async insertPersonLocation(data) {
    const PERSON_LOCATION_INSERT_URL = this.PL_BASE_URL;
    const pk_data = '{"personLocationPK":' + JSON.stringify(data) + "}";
    return fetch(PERSON_LOCATION_INSERT_URL, {
      method: "POST",
      body: pk_data,
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

  async deletePersonLocation(data) {
    console.log("deletePersonLocation");
    console.log(data);
    const PERSON_LOCATION_DELETE_URL =
      this.PL_BASE_URL +
      "/id;personid=" +
      data.personid +
      ";locationid=" +
      data.locationid;
    return fetch(PERSON_LOCATION_DELETE_URL, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.text();
    });
  }

  async retrievePersonBehaviors(persID) {
    const PERSON_BEHAVIORS_URL = this.PB_VW_BASE_URL + "/personid/" + persID;
    console.log(PERSON_BEHAVIORS_URL);
    try {
      const response = await fetch(PERSON_BEHAVIORS_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("from retrievePersonBehaviors");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  async insertPersonBehavior(data) {
    const PERSON_BEHAVIOR_INSERT_URL = this.PB_BASE_URL;
    const pk_data = '{"personBehaviorPK":' + JSON.stringify(data) + "}";
    return fetch(PERSON_BEHAVIOR_INSERT_URL, {
      method: "POST",
      body: pk_data,
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

  async deletePersonBehavior(data) {
    const PERSON_BEHAVIOR_DELETE_URL =
      this.PB_BASE_URL +
      "/id;personid=" +
      data.personid +
      ";behaviorid=" +
      data.behaviorid;
    return fetch(PERSON_BEHAVIOR_DELETE_URL, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        this.handleResponseError(response);
      }
      return response.text();
    });
  }

  handleResponseError(response) {
    throw new Error("HTTP error, status = " + response.status);
  }

  handleError(error) {
    console.log(error.message);
  }
}

export default PersonsService;
