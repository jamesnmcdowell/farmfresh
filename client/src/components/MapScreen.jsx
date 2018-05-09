import React, { Component } from 'react';
import { connect } from 'react-redux';

class MapScreen extends Component {
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        let { locations } = this.props;
        return (
            <h1> Map Screen</h1>
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