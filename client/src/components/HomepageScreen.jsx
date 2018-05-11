import React, { Component } from 'react';
import { connect } from 'react-redux';
import Shell from './Shell';

class HomepageScreen extends Component {
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <Shell>
                <h1> Homepage Screen</h1>
            </Shell>
        );
   
    }
}

let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
});

let HomepageScreenState = connect(
    mapStateToProps,
)(HomepageScreen);

export default HomepageScreenState;