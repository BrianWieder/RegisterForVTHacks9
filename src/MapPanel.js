import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import SearchBox from "./Search";

const Marker = ({ text }) => <img src="/bad-marker.png" />;

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
          <Marker
            lat={this.props.center.lat}
            lng={this.props.center.lng}
            text="Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
