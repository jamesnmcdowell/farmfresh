import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Shell from './Shell';
import { updateVendorByIdAC } from '../redux/actions'

class VendorScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }
    async componentDidMount() {
        let {id } = this.props.match.params;
        updateVendorByIdAC(this.props.dispatch, id);
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isLoading && this.props.products.length > 0) {
            this.setState({ isLoading: false });
        }
        if (this.state.isLoading && this.props.products !== prevProps.products) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        let { isLoading } = this.state;
        let { vendor } = this.props;
        console.log(vendor);
        return (
            <Shell>
                <h1> vendor page {vendor.name} </h1>
            </Shell>
        );
    }
}

let mapStateToProps = (state, props) => {
    let { currentVendor } = state;
    return { vendor: currentVendor };
};

let VendorScreenState = connect(
    mapStateToProps
)(VendorScreen);

export default VendorScreenState;







