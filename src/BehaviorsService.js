class BehaviorsService {
  BASE_URL =
    "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.behaviors";

  async retrieveBehaviors() {
    const BEHAVIORS_URL = this.BASE_URL;
    try {
      const response = await fetch(BEHAVIORS_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("from retrieveBehaviors");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  async insertBehavior(data) {
    const BEHAVIORS_INSERT_URL = this.BASE_URL;
    return fetch(BEHAVIORS_INSERT_URL, {
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

  async updateBehavior(data) {
    const BEHAVIORS_UPDATE_URL = this.BASE_URL + "/" + data.id;
    return fetch(BEHAVIORS_UPDATE_URL, {
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

  async deleteBehavior(id) {
    const BEHAVIORS_DELETE_URL = this.BASE_URL + "/" + id;
    return fetch(BEHAVIORS_DELETE_URL, {
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

export default BehaviorsService;
