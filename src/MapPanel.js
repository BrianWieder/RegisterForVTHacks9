import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import SearchBox from "./Search";

const Marker = ({ text }) => (
  <img src="/good-marker.png" className="simple-marker" />
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 37.226596,
      lng: -80.423082,
    },
    zoom: 15,
  };

  state = {
    lat: 37.226596,
    lng: -80.423082,
  };

  render() {
    const pins = this.props.locations.map((loc) => {
      if (loc === undefined || loc.location === undefined) {
        return null;
      }
      return <Marker lat={loc.location[1]} lng={loc.location[0]} />;
    });
    console.log(pins);
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "100vh", width: "100%" }}>
        <SearchBox
          onPlacesChanged={(places) => {
            console.log(places[0].geometry.location.lat());
            this.setState({
              lat: places[0].geometry.location.lat(),
              lng: places[0].geometry.location.lng(),
            });
          }}
        />
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPSID }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={{ lat: this.state.lat, lng: this.state.lng }}
        >
          {pins}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
