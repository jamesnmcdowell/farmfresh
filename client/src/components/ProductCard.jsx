import React from 'react';
import Stars from './Stars';
import { Link } from 'react-router-dom';


let productCard = ({ product, match }) =>
    <Link className="product-card-link" to={{ pathname: `/products/${product.id}` }} >
        <div className="product-card">
            <img className="product-card-image" src={product.category.image_url} />
            <div className="product-card-right"> 
                <div className="product-card-info">
                    <div className="product-card-details">
                        <span className="pcard-name"> {product.name} </span>
                        <span> {product.price} / {product.unit_of_measure} </span>
                        <Stars />
                        
                    </div>
                    <div className="">
                        <span className="pcard-vendor"> {product.vendor.name} </span>
                    </div>
                </div>
                <div className="product-card-location">
                    <span> 20 miles </span>
                    <span>View locations</span>
                </div>
                
            </div>
        </div>
    </Link>

export default productCard;