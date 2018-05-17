import React, { Component } from 'react';
import { connect } from 'react-redux';
import Shell from './Shell';
import VendorDashboardNav from './VendorDashboardNav';
import { updateVendorDataAC } from '../redux/actions';

class VendorProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }
    fetchProducts() {
        updateVendorDataAC(this.props.dispatch);
    }
    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isLoading && this.props.vendorProfile && this.props.vendorProfile.length > 0) {
            this.setState({ isLoading: false });
        }
        if (this.state.isLoading && this.props.vendorProfile !== prevProps.vendorProfile) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        let { isLoading } = this.state;
        let { vendorProducts, vendorProfile, vendorLocations } = this.props;
        if (!vendorProfile) vendorProfile = {};
        console.log(vendorProfile);
        return (
            <Shell>
                <VendorDashboardNav/>
                <div className="vendor-profile-header">
                    <h1> {vendorProfile.name}'s Profile </h1>
                    <p>{vendorProfile.address} {vendorProfile.city}, {vendorProfile.state}</p>
                </div>
            </Shell>
        );
    }
}
// id
// name
// description
// start_time
// end_time
// address
// city
// state
// zip
// valid_days

let mapStateToProps = (state, props) => ({
    vendorProfile: state.vendorProfile,
    vendorProducts: state.vendorProducts,
    vendorLocations: state.vendorLocations,
});

let VendorProfileState = connect(
    mapStateToProps
)(VendorProfile);

export default VendorProfileState;
