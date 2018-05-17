import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Shell from './Shell';
import { updateVendorByIdAC } from '../redux/actions'
import MDSpinner from "react-md-spinner";

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
                {isLoading ? <div className="loading-spinner"> <MDSpinner size={50} singleColor="#FEC04A" color2="#673ab7" /> </div> : vendor !== null ?
                <div>
                    <div className="product-view-page">
                        <div className="vendor-snapshot">
                            <div className="vendor-snapshot-details">
                                <h2>{vendor.name} </h2>
                                <span> {vendor.address} </span>
                                <span> {vendor.city}, {vendor.state} {vendor.zip} </span>
                            </div>
                            <img src={vendor.image_url} />
                        </div>
                    </div>
                        <div className="vendor-page-descriptions">
                            <p>{vendor.about_description  }</p>
                            <p>{vendor.product_description }</p>
                        </div>
                    </div>
                    : <p>cannot find vendor </p>
                }
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







