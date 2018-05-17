import React from 'react';
import Stars from './Stars';
import { Link } from 'react-router-dom';
import _ from 'lodash';

let productCard = ({ product, match, userLocation, loadingLocation }) => {
    let locations = product.vendor.locations;
    console.log(product);
    console.log("userLocation");
    console.log(userLocation);
    console.log("loadingLocation");
    console.log(loadingLocation);
    let userLocationStorage = JSON.parse(localStorage.getItem('userLocation'));
    console.log("userLocationStorage");
    console.log(userLocationStorage);
    let findClosestLocation = (userLoc) => {
        console.log('james is cool');
        let myCord = new window.google.maps.LatLng(userLoc.lat, userLoc.lng);
        console.log(userLoc.lat);
        console.log('YOOOdsdsddg');
        if (locations.length === 0) {
            return 'no locations'
        }
        else {
        let distanceArray = locations.map((val) => { console.log('YOOO'); console.log(val.lat); return ({ 
            ...val, 
            distanceFrom: calcDistance(
                new window.google.maps.LatLng(val.lat, val.lng),  
                myCord 
            )})
        }
        );
        console.log(distanceArray);
        let lodashResult = _.sortBy(distanceArray, [function (o) { return o.distanceFrom; }]);
        console.log('lodash');
        console.log(lodashResult[0]);
  
        return (lodashResult[0].distanceFrom.toFixed(2)) + ' miles';
        }
    }

    function calcDistance(otherCord, myCord) {
        return (window.google.maps.geometry.spherical.computeDistanceBetween(otherCord, myCord) / 1000);
    }

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
                { loadingLocation ?
                <div className="product-card-location">
                    <span> {findClosestLocation(userLocationStorage)} </span>
                    <span>View locations</span>
                </div>    
                             :
                <div className="product-card-location">
                <span> {findClosestLocation(userLocation)} </span>
                <span>View locations</span>
            </div>    
                }
            </div>
        </div>
    </Link>
};
export default productCard;

