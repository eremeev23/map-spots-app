export class ApiService {
  async updateStore(markers) {
    return await new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem("markers", JSON.stringify(markers));
        return resolve({ message: "ok", status: 201 });
      }, 100)
    });
  }

  async getMarkers() {
    return await new Promise((resolve) => {
      setTimeout(() => {
        const markers = JSON.parse(localStorage.getItem("markers"));
        return resolve({ message: "ok", status: 200, data: markers })
      }, 100)
    })
  }

  async getAddressByCoords([lat, lon]) {
    try {
      const response = await fetch(
        `https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`
      );
      const { display_name } = await response.json();
      return display_name;
    } catch (e) {
      return null;
    }
  }
}
