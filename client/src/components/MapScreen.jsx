import React, { Component } from 'react';
import { connect } from 'react-redux';
import GoogleApiWrapper from './MapContainer';

class MapScreen extends Component {
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        let { locations } = this.props;
        return (
            <div>
                <h1> Map Screen</h1>
                <GoogleApiWrapper />
            </div>
        );
    }
}

let mapStateToProps = (state, props) => {
    let { locations } = state;
    return { locations: locations };
};

let MapScreenState = connect(
    mapStateToProps
)(MapScreen);

export default MapScreenState; 