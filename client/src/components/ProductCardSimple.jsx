import React from 'react';
import { Link } from 'react-router-dom';

let ProductCardSimple = ({ product, match }) => 
    <Link className="product-card-link" to={{ pathname: `/products/${product.id}` }} >
        <div className="product-card">
            <img className="product-card-image" src={product.category.image_url} />
            <div className="product-card-right">
                <div className="product-card-info">
                    <div className="product-card-details">
                        <span className="pcard-name"> {product.name} </span>
                        <span> {product.price} / {product.unit_of_measure} </span>
                    </div>
                    <div className="">
                        <span className="pcard-vendor">  </span>
                    </div>
                </div>
                <div className="product-card-location">
                    {/* <span> 20 miles </span>
                    <span>View locations</span> */}
                </div>
            </div>
        </div>
    </Link>

export default ProductCardSimple;

