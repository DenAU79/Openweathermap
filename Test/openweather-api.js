// Assuming that all optional parameters work as expected
// Assuming that response should be JSON object
// Assuming that response should include Data object with Weather property
// Assuming that city is id=2643743
// Assuming that text of all error messages is correct

const { expect } = require("chai");
const CityNameApi = require("../pageobject/byCityName/byCityName-helpers");
const apiKey = "";
let response;

describe("Weather API for London ", async function () {
  it("Should be able to send Get request by city name", async function () {
    const cityName = "q=London";
    response = await CityNameApi.getWeatherApiByCityName(cityName, apiKey);
  });

  it("Verify that response status is 200", async function () {
    expect(response.status).to.equal(200);
  });

  it("Verify that response is a JSON object", async function () {
    expect(response).to.be.an("object");
  });

  it("Verify that HTTP headers are as expected", async function () {
    expect(response.headers).to.have.property("server");
    expect(response.headers).to.have.property("content-type");
    expect(response.headers).to.have.property("connection");
    expect(response.headers).to.have.property("date");
  });

  it("Verify that response data is an object that include Weather property", async function () {
    expect(response.data).to.be.an("object");
    expect(response.data).to.have.property("weather");
  });

  it("Verify that city name in response is correct", async function () {
    expect(response.data.name).to.equal("London");
  });

  it("Verify that city id in response is correct", async function () {
    expect(response.data.id).to.equal(2643743);
  });

  it("Verify that there is no state change in the system", async function () {
    const cityName = "q=London";
    let response1 = await CityNameApi.getWeatherApiByCityName(cityName, apiKey);
    expect(response.data.coord).to.deep.equal(response1.data.coord);
    expect(response.data.id).to.equal(response1.data.id);
    expect(response.data.name).to.equal(response1.data.name);
  });

  it("Verify 401 error message response with only city name parameter and no API key in Get request", async function () {
    const cityName = "q=London";
    let noApiKeyGetRequest = await CityNameApi.getWeatherApiByCityName(
      cityName
    );
    expect(noApiKeyGetRequest.response.status).to.equal(401);
    expect(noApiKeyGetRequest.response.statusText).to.equal("Unauthorized");
    expect(noApiKeyGetRequest.response.data.message).to.equal(
      "Invalid API key. Please see http://openweathermap.org/faq#error401 for more info."
    );
  });

  it("Verify 404 error message response with invalid city name in the authorized Get request", async function () {
    const cityName = "q=invalidCityName";
    let invalidNameGetRequest = await CityNameApi.getWeatherApiByCityName(
      cityName,
      apiKey
    );
    expect(invalidNameGetRequest.response.status).to.equal(404);
    expect(invalidNameGetRequest.response.statusText).to.equal("Not Found");
    expect(invalidNameGetRequest.response.data.message).to.equal(
      "city not found"
    );
  });

  it("Verify 400 error message response with no city name in the authorized Get request", async function () {
    let cityName;
    let noParamGetRequest = await CityNameApi.getWeatherApiByCityName(
      cityName,
      apiKey
    );
    expect(noParamGetRequest.response.status).to.equal(400);
    expect(noParamGetRequest.response.statusText).to.equal("Bad Request");
    expect(noParamGetRequest.response.data.message).to.equal(
      "Nothing to geocode"
    );
  });
});
