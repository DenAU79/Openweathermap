const axios = require("axios").default;

class CityNameApi {
  get baseUrl() {
    return "http://api.openweathermap.org/data/2.5/weather?";
  }

  async getWeatherApiByCityName(cityName, apiKey) {
    return await axios
      .get(this.baseUrl + cityName + "&appid=" + apiKey)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }
}
module.exports = new CityNameApi();
