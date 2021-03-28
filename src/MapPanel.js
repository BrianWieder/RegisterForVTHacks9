import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const MapPanel = ({text}) => (
    <div>{ text } </div>
);

class SimpleMap extends Component {
    static defaultProps = {
      center: {
        lat: 37.226596,
        lng: -80.423082
      },
      zoom: 15
    };
   
    render() {
      return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GMAPSID}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            <MapPanel
              lat={37.226596}
              lng={-80.423082}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      );
    }
  }
   
export default SimpleMap;