import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';
import Shell from './Shell';
import { updateProductsAC } from '../redux/actions'

class ProductListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: false };
    }

    async componentDidMount() {
        let { type, id } = this.props.match.params;
        updateProductsAC(this.props.dispatch, type, id);
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
        let { products } = this.props;
        console.log(products);
        return (
            <Shell>
                <div className="product-list">
                    {isLoading ? <h1> loading </h1> : products.length > 0 ?
                        products.map((product, i) => <ProductCard key={`${product.id}_${i}`} product={product} />) :
                        <p>no products found </p>
                    }
                </div>
            </Shell>
        );
    }
}

let mapStateToProps = (state, props) => {
    let { products } = state;
    return { products: products };
};

let ProductListScreenState = connect(
    mapStateToProps
)(ProductListScreen);

export default ProductListScreenState; 







