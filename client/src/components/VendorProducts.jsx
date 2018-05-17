import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCardSimple from './ProductCardSimple';
import { updateVendorDataAC } from '../redux/actions';
import MDSpinner from "react-md-spinner";

class VendorProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true};
    }
    fetchProducts() {
        updateVendorDataAC(this.props.dispatch );
    }
    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isLoading && this.props.vendorProducts && this.props.vendorProducts.length > 0) {
            this.setState({ isLoading: false });
        }
        if (this.state.isLoading && this.props.vendorProducts !== prevProps.vendorProducts) {
            this.setState({ isLoading: false });
        }
    }

    render() {
        let { isLoading } = this.state;
        let { vendorProducts, vendorProfile, vendorLocations } = this.props;
        console.log('rabbit');
        console.dir(vendorProducts);
        if (!vendorProducts) vendorProducts = [];
        return (
            <div className="product-list">
                {isLoading ? <div className="loading-spinner"> <MDSpinner size={50} singleColor="#FEC04A" color2="#673ab7" /> </div> : vendorProducts.length > 0 ?
                    vendorProducts.map((product, i) => <ProductCardSimple key={`${product.id}_${i}`}product={product} />) :
                    <p>no products found </p>
                }
            </div>
        );
    }
}

let mapStateToProps = (state, props) => ({
        vendorProfile: state.vendorProfile,
        vendorProducts: state.vendorProducts,
        vendorLocations: state.vendorLocations, 
});

let VendorProductsState = connect(
    mapStateToProps
)(VendorProducts);

export default VendorProductsState;







