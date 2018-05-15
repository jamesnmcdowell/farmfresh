import React from 'react';
import { connect } from 'react-redux';
import { setToken } from '../redux/actions';
import Router from '../Router';

class TokenFromLocal extends React.Component {
    componentDidMount() {
        let { setToken } = this.props;
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        setToken(currentUser);
    }

    render() {
        return (
            <Router />
        )
    }
}

let mapDispatchToProps = dispatch => ({ setToken: (token) => dispatch(setToken(token)) });
let mapStateToProps = state => state;
let TokenFromLocalContainer = connect(mapStateToProps, mapDispatchToProps)(TokenFromLocal)
export default TokenFromLocalContainer;
