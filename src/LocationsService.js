class LocationsService {
  async retrieveLocations() {
    const LOCATIONS_URL =
      "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.locations";
    try {
      const response = await fetch(LOCATIONS_URL, {
        method: "GET",
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        this.handleResponseError(response.statusText);
      }
      const json = await response.json();
      console.log("from retrieveLocations");
      console.log(json);
      return json;
    } catch (error) {
      this.handleError(error);
    }
  }

  async insertLocation(data) {
    const LOCATIONS_INSERT_URL =
      "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.locations";
    return fetch(LOCATIONS_INSERT_URL, {
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

  async updateLocation(data) {
    const LOCATIONS_UPDATE_URL =
      "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.locations/" +
      data.id;
    return fetch(LOCATIONS_UPDATE_URL, {
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

  async deleteLocation(id) {
    const LOCATIONS_DELETE_URL =
      "http://localhost:8080/BehaviorTracker/resources/tech.ronpainter.behaviortracker.locations/" +
      id;
    return fetch(LOCATIONS_DELETE_URL, {
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

export default LocationsService;
