import React from "react";
import { compose, withProps, lifecycle } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker}
  from "react-google-maps";
import { MarkerClusterer } from
  "react-google-maps/lib/components/addons/MarkerClusterer";
import {connect} from "react-redux";
import currentPosition from "../actions/currentPositionAction";
import PropTypes from "prop-types";

let mapStateToProps = ({caches, currentLat, currentLng}) => {
  return {caches, currentLat, currentLng};
};

let mapDispatchtoProps = (dispatch) => {
  let setCurrentPostition = (Lat, Lng) => {
    dispatch(currentPosition(Lat, Lng));
  };
  return {setCurrentPostition};
};

let connection = connect(mapStateToProps, mapDispatchtoProps);

let locationManagmentHooks = lifecycle({
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}}) => {
      this.props.setCurrentPostition(latitude, longitude);
    });
    let watch = navigator.geolocation.watchPosition(({coords:{latitude, longitude}}) => {
      this.props.setCurrentPostition(latitude, longitude);
    });
    this.setState({watch});
  },
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.state.watch);
  }
});

let mapComponent = ({caches=[], currentLat=33.848460, currentLng=-84.37360}) => {
  return <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: currentLat, lng: currentLng }}
  >
    <Marker position={{lat:currentLat, lng:currentLng}} icon="/UserLocation.png"/>
    <MarkerClusterer>
      <Marker position={{ lat: 33.8487, lng: -84.3734 }} title="Atlanta Tech Village" />
      {caches.map( ({latitude:lat,longitude:lng, id, name}) => {
        return <Marker position={{lat, lng}} title={name} key={id}/>;
      })}
    </MarkerClusterer>
  </GoogleMap>;
};

mapComponent.propTypes = {
  caches: PropTypes.array,
  currentLat: PropTypes.number,
  currentLng: PropTypes.number,
};

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAyesbQMyKVVbBgKVi2g6VX7mop2z96jBo&v=3",
    loadingElement: <div style={{ height: "100%" }} />,
    containerElement: <div style={{ height: "400px" }} />,
    mapElement: <div style={{ height: "93.2vh" }} />,
  }),
  withScriptjs,
  withGoogleMap,
  connection,
  locationManagmentHooks
)(mapComponent);

// AIzaSyAd627TYIzdl4hWGQ6aikUkXho3nwHOetQ&v=3" old key

export default MyMapComponent;