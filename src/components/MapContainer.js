import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";
import * as icons from "../utils/icons/Icons";

const iconImages = icons.icons[0];

class MapContainer extends Component {
  addCategory = () => {
    let category = "";
    const location = this.props.appState.filteredLocations.filter(
      el => el.venue.name === this.props.appState.clickedMarker.name
    );

    if (location[0]) {
      category = location[0].venue.categories[0].shortName;
    }
    return category;
  };

  addIcon = () => {
    let category = this.addCategory().toLowerCase();
    let url = "";
    if (category === "thai") {
      url = `url(${iconImages.thai})`;
    } else if (category === "indian") {
      url = `url(${iconImages.indian})`;
    } else if (category === "chinese") {
      url = `url(${iconImages.chinese})`;
    } else if (category === "sushi") {
      url = `url(${iconImages.sushi})`;
    } else if (category === "japanese") {
      url = `url(${iconImages.japan})`;
    } else if (category === "vietnamese") {
      url = `url(${iconImages.vietnamese})`;
    } else if (category === "asian") {
      url = `url(${iconImages.asian})`;
    } else {
      url = `url(${iconImages.other})`;
    }
    return url;
  };

  render() {
    const icon = {
      url: iconImages.marker
    };
    return (
      <Map
        google={this.props.google}
        initialCenter={{
          lat: 50.064650,
          lng: 19.944980
        }}
        zoom={13}
        onClick={this.props.onMapClick}
      >
        {this.props.appState.filteredLocations.map(marker => (
          <Marker
            onClick={this.props.onMarkerClick}
            key={marker.venue.id}
            position={{
              lat: marker.venue.location.lat,
              lng: marker.venue.location.lng
            }}
            name={marker.venue.name}
            address={marker.venue.location.address}
            animation={
              marker.venue.name === this.props.appState.clickedMarker.name
                ? this.props.appState.animation
                : null
            }
            ref={this.props.addMarker}
            icon={icon}
          />
        ))}

        <InfoWindow
          onClose={this.props.onInfoWindowClose}
          marker={this.props.appState.clickedMarker}
          visible={this.props.appState.showInfoWindow}
          locations={this.props.appState.filteredLocations}
        >
          <div className="info-window">
            <h1 className="info-window-title">
              {this.props.appState.clickedMarker.name}
            </h1>
            <p
              className="info-window-icon"
              style={{
                backgroundImage: `${this.addIcon()}`
              }}
            />
            <p className="info-window-details">
              Address:{" "}
              {this.props.appState.clickedMarker.address
                ? this.props.appState.clickedMarker.address
                : "no address available"}
            </p>
            <p className="info-window-details">
              Category: {this.addCategory()}
            </p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default MapContainer;
