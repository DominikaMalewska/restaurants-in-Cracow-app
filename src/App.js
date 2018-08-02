import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";
import Error from "./components/Error";
import LocationsList from "./components/LocationsList";
import MapContainer from "./components/MapContainer";
import Search from "./components/Search";

import "./App.css";

class App extends Component {
  state = {
    locations: [],
    filteredLocations: [],
    showInfoWindow: false,
    clickedMarker: {},
    selectedPlace: {},
    animation: 0,
    error: false,
    menuOpen: true,
    searchQuery: ""
  };

  // add all rendered markers to array to be able to iterrate through all markers
  allMarkers = [];
  addMarker = marker => {
    if (marker) {
      this.allMarkers.push(marker);
    }
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      clickedMarker: marker,
      showInfoWindow: true,
      animation: 1
    });
  };

  onMapClick = () => {
    this.setState({
      showInfoWindow: false,
      animation: 0
    });
  };

  onListItemClick = e => {
    const clicked = this.allMarkers.filter(
      el => el.marker.name === e.target.textContent
    );
    this.setState({
      clickedMarker: clicked[0].marker,
      showInfoWindow: true,
      animation: 1
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      animation: 0,
      showInfoWindow: false
    });
  };

  onSearchLocation = e => {
    const query = e.target.value;
    const filteredLocations = this.state.locations.filter(
      el =>
        el.venue.name.toLowerCase().includes(query.toLowerCase()) ||
        el.venue.categories[0].shortName
          .toLowerCase()
          .includes(query.toLowerCase())
    );
    this.setState({
      searchQuery: query,
      filteredLocations: filteredLocations,
      showInfoWindow: false,
      animation: 0
    });
  };

  // imitate a click on list item, when enter key is pressed
  clickListItem = e => {
    if (e.keyCode === 13) {
      e.target.click();
    } else if (this.state.showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        animation: 0
      });
    }
  };

  toggleMenu = () => {
    if (this.state.menuOpen) {
      this.setState({ menuOpen: false });
    } else {
      this.setState({ menuOpen: true });
    }
  };

  componentDidMount() {
    const key ="BZCFNBCSSMKFJPA1OFSCJWY2AZFBHDWNNYUYKP45QS5CPPIV";
    const secret = "3PL0XSKTBAXIFIYBCRDE54XBHPZX3PGCLKCFD3CT1LVPZLI2";
    fetch(
      `https://api.foursquare.com/v2/venues/explore?ll=50.064650,19.944980&categoryId=4bf58dd8d48988d142941735&checkin=intent&radius=6000&limit=50&client_id=${key}&client_secret=${secret}&v=20180726`
    )
      .then(response => response.json())
      .then(res => {
        const result = res.response.groups[0].items;

        this.setState({
          locations: result,
          filteredLocations: result
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    // handle error, when google map fails to load
    window.gm_authFailure = () => this.setState({ error: true });
    if (window.google === undefined) {
      this.setState({ error: true });
    }
  }

  render() {
    const noError = !this.state.error;
    const menuOpen = this.state.menuOpen;

    return (
      <div className="App">
        <header className="header">
          <Button toggleMenu={this.toggleMenu} />
          <h1 className="header-title">Eat it Asian in Kraków-Cracow</h1>
        </header>

        {noError ? (
          <div className="wrapper">
            {menuOpen && (
              <aside className="sidebar">
                <Search
                  onSearchLocation={this.onSearchLocation}
                  searchQuery={this.state.searchQuery}
                />
                <LocationsList
                  filteredLocations={this.state.filteredLocations}
                  onListItemClick={this.onListItemClick}
                  clickListItem={this.clickListItem}
                />
              </aside>
            )}

            <div className="map" role="application">
              <MapContainer
                google={window.google}
                addMarker={this.addMarker}
                onMarkerClick={this.onMarkerClick}
                onInfoWindowClose={this.onInfoWindowClose}
                onMapClick={this.onMapClick}
                appState={this.state}
              />
            </div>
          </div>
        ) : (
          <Error />
        )}
        <footer className="footer">
          <p className="footer-copyrights">
            Restaurants data from Foursquare API, all icons from Flaticon.
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
