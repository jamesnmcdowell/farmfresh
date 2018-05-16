import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Shell from './Shell';
import { createVendorAC } from '../redux/actions';

class VendorSignupScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { createVendorAC } = this.props;
        return (
            <Shell>
                <div className="vendor-s-hero">
                    <div className="vendor-s-hero-container">
                        <h1 > Connect with a community of individuals passionate about supporting local farms </h1>
                        <button onClick={() => { let userId = (JSON.parse(localStorage.getItem('currentUser'))).id; console.log(userId); createVendorAC(userId) }} className="button-default"> Open your vendor page </button>
                    </div>
                </div>
            </Shell>
        );
    }
}

let mapStateToProps = (state, props) => {
    let { products, userLocation } = state;
    return {
        products: products,
        userLocation: userLocation
    };
};

let mapDispatchToProps = dispatch => (
    {
        createVendorAC: (userId) => createVendorAC(dispatch, userId),
    }
);

let VendorSignupScreenState = connect(
    mapStateToProps,
    mapDispatchToProps
)(VendorSignupScreen);

export default VendorSignupScreenState;







