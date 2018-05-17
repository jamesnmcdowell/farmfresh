import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Shell from './Shell';
import { updateProductsAC, updateUserLocationAC } from '../redux/actions';
import MDSpinner from "react-md-spinner";


class ProductListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, loadingLocation: true };
    }
    fetchProducts() {
        let { type, id } = this.props.match.params;
        updateProductsAC(this.props.dispatch, type, id);
        updateUserLocationAC(this.props.dispatch);
    }
   componentDidMount() {
       this.fetchProducts();
       
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchProducts()
        }
        let {userLocation} = this.props;
        if (this.state.isLoading && this.props.products.length > 0) {
            this.setState({ isLoading: false });
        }
        if (this.state.isLoading && this.props.products !== prevProps.products) {
            this.setState({ isLoading: false });
        }
        if (userLocation !== prevProps.userLocation) {
            console.log('set this here');
            console.log(this.props.userLocation);
            this.setState({ loadingLocation: false });
        }   
        
    }

    render() {
        let { isLoading, loadingLocation} = this.state;
        let { products, userLocation } = this.props;
        console.log(products);
        console.log(userLocation);
        return (
            <Shell>
                <div className="product-list">
                    {isLoading ? <div className="loading-spinner"> <MDSpinner size={50} singleColor="#FEC04A" color2="#673ab7" /> </div> : products.length > 0 ?
                        products.map((product, i) => <ProductCard key={`${product.id}_${i}`} loadingLocation={loadingLocation} userLocation={userLocation} product={product} />) :
                        <p>no products found </p>
                    }
                </div>
            </Shell>
        );
    }
}

let mapStateToProps = (state, props) => {
    let { products, userLocation } = state;
    return { products: products,
             userLocation: userLocation
    
    };
};

let ProductListScreenState = connect(
    mapStateToProps
)(ProductListScreen);

export default ProductListScreenState; 







