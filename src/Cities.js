import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class Cities extends Component {
  constructor() {
    super();
    this.state = {
      cityBikeAvailability: [],
      selectedCity: "",
      countryArray: [],
      apiResponse: [],
      defaultCountry: ""
    };
  }

  componentDidMount() {
    let countries = [];
    let companies = [];
    //this is making api calls with axios
    axios({
      method: "get",
      url: "http://api.citybik.es/v2/networks",
      responseType: "json",
      params: {
        fields: "id,name,location"
      }
    }).then(res => {
      //   console.log(res.data.networks);
      const results = res.data.networks;

      countries = res.data.networks.map(cntry => cntry.location.country);
      //   console.log(countries);
      countries = [...new Set(countries)];
      companies = res.data.networks.filter(
        x => x.location.country === countries[0]
      );
      ////this changes the initial state to the value we get back from the api call
      //   console.log(companies);
      this.setState({
        countryArray: countries,
        defaultCountry: countries[0],
        apiResponse: results
      });
      this.calculateAvailableBikes(companies);
    });
  }

  calculateAvailableBikes = companies => {
    let companyIdArray = companies.map(x => x.id);
    this.getCities(companyIdArray);
  };

  getCities = companyIdArray => {
    const newArray = [];
    let avlRentals = [];
    const bikeAvlArray = [];
    let countBikes = 0;
    let countAvlSpaces = 0;
    companyIdArray.map(companyId => {
      axios({
        method: "get",
        url: `http://api.citybik.es/v2/networks/${companyId}`,
        responseType: "json"
      }).then(resultNew => {
        // console.log(resultNew);
        let city =
          resultNew.data.network.location === undefined ||
          resultNew.data.network.location === null ||
          typeof resultNew.data.network.location === "string"
            ? ""
            : resultNew.data.network.location.city;
        let comp =
          resultNew.data.network.company === undefined ||
          resultNew.data.network.company === null ||
          typeof resultNew.data.network.company === "string" //Handle Issues with Bad API data quality
            ? ["Not Found"]
            : resultNew.data.network.company.length === 0
            ? ["Not Found"]
            : resultNew.data.network.company.map(e => e);
        let availability = resultNew.data.network.stations.forEach(element => {
          countBikes += element.free_bikes;
          countAvlSpaces += element.empty_slots;
        });

        newArray.push({
          city: city,
          countBikes: countBikes,
          countAvlSpaces: countAvlSpaces,
          avlPercentage:
            countAvlSpaces === 0
              ? 0
              : Math.round((countBikes / countAvlSpaces) * 100),
          companies: comp
        });
        this.setState({
          cityBikeAvailability: newArray,
          selectedCity: newArray[0].city
        });
      });
    });
  };

  loadCitiesForCountry = countryCode => {
    let companies = this.state.apiResponse.filter(
      x => x.location.country === countryCode
    );
    this.setState({
      defaultCountry: countryCode
    });
    this.calculateAvailableBikes(companies);
  };

  render() {
    return (
      <div className="App">
        <header>
          <div className="headerImage">
            <img
              style={{ position: "relative", zIndex: 10 }}
              src={`https://www.countryflags.io/${
                this.state.defaultCountry === "UK"
                  ? "GB"
                  : this.state.defaultCountry
              }/flat/64.png`}
              alt={`Flag Image for ${this.state.defaultCountry}-country`}
            />
          </div>
        </header>
        <div className="main">
          <div className="sideBar">
            {this.state.countryArray.map(cntry => {
              return (
                <div className="flags" tabIndex={cntry}>
                  <img
                    style={{ position: "relative", zIndex: 10 }}
                    onClick={() => {
                      this.loadCitiesForCountry(cntry);
                    }}
                    src={`https://www.countryflags.io/${
                      cntry === "UK" ? "GB" : cntry
                    }/flat/64.png`}
                    alt={`Flag Image for ${cntry}-country`}
                  />
                </div>
              );
            })}
          </div>
          <div className="content">
            <div className="cities wrapper">
              {this.state.cityBikeAvailability.map(city => {
                return (
                  <div className="finalContainer">
                    <h1 className="cityName">{city.city}</h1>
                    <div className="availability">
                      <span className="availabilityHeading">
                        Availability:{" "}
                      </span>

                      <span
                        style={{
                          color:
                            city.avlPercentage < 25 ? "#CC2936" : "#388697",
                          fontSize: 50
                        }}
                      >
                        {city.avlPercentage.isNaN ? 0 : city.avlPercentage} %
                      </span>
                    </div>

                    <div className="companies">
                      <span className="companiesHeader">Companies:</span>
                      <span
                        style={{
                          color:
                            city.avlPercentage < 25 ? "#CC2936" : "#388697",
                          textDecoration: "none"
                        }}
                      >
                        {" "}
                        {city.countBikes} Bikes/{city.countAvlSpaces} Spots
                      </span>
                    </div>
                    {city.companies.map(comp => {
                      return <h4>{comp}</h4>;
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cities;
