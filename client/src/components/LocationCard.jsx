import React from 'react';
import Stars from './Stars';
import { Link } from 'react-router-dom';

let LocationCard = ({ product, match }) =>
    <Link className="product-card-link" to={{ pathname: `/products/${product.id}` }} >
        <div className="product-card">
            <img className="product-card-image" src="https://image.flaticon.com/icons/svg/862/862856.svg" />
            <div className="product-card-right">
                <div className="product-card-info">
                    <div className="product-card-details">
                        <span className="pcard-name"> {product.name} </span>
                        <span> {product.address}  </span>
                        <span>  </span>
                        <span> {product.start_time} - {product.end_time} </span>
                    </div>
                    <div className="">
                        <span className="pcard-vendor"> {product.valid_days} </span>
                    </div>
                </div>
              
            </div>
        </div>
    </Link>

export default LocationCard;

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