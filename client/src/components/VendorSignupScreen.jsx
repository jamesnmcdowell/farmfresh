import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Shell from './Shell';

class VendorSignupScreen extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Shell>
                <div className="vendor-s-hero">
                    <div className="vendor-s-hero-container">
                        <h1 > Connect with a community of individuals passionate about supporting local farms </h1>
                        <button className="button-default"> Open your vendor page </button>
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

let VendorSignupScreenState = connect(
    mapStateToProps
)(VendorSignupScreen);

export default VendorSignupScreenState;







