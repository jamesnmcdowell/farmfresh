import React from 'react';
import Stars from './Stars';
import { Link } from 'react-router-dom';


let productCard = ({ product, match }) => {
    let locations = product.vendor.locations;
    console.log(locations)
    // let predefinedLocations = [
    //     {
    //         "name": "Brookwood Medical Center",
    //         "lat": 33.4636415,
    //         "lng": -86.7771671
    //     },
    //     {
    //         "name": "Lutheran Medical Center",
    //         "lat": 40.646872,
    //         "lng": -74.020892
    //     },
    //     {
    //         "name": "Chitpotle",
    //         "lat": 33.8481102,
    //         "lng": -84.37418590000001
    //     }
    // ];

    // var myCord = (33.867711, -84.099770);

    // let distanceArray = predefinedLocations.map((val) => ({ ...val, distanceFrom: calcDistance((val.lat, val.lng), myCord) }));
    // console.log("distanceArray");
    // console.log(distanceArray);
    // function calcDistance(otherCord, myCord) {
    //     return (google.maps.geometry.spherical.computeDistanceBetween(otherCord, myCord) / 1000).toFixed(2);
    // }

    return <Link className="product-card-link" to={{ pathname: `/products/${product.id}` }} >
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
};
export default productCard;