import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';
import { updateItemByIdAC } from '../redux/actions';
import Shell from './Shell';
import { Link } from 'react-router-dom';
import { updateUserLocationAC } from '../redux/actions';
import {findClosestLocation} from  '../util';
import MDSpinner from "react-md-spinner";

class ProductViewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true, loadingLocation: true  };
    }
    fetchProducts() {
        let { id } = this.props.match.params;
        updateItemByIdAC(this.props.dispatch, id);
        updateUserLocationAC(this.props.dispatch);
    }
    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchProducts()
        }
        if (this.state.isLoading && this.props.currentItem && this.props.currentItem === 0 ) {
            this.setState({ isLoading: false });
        }
        if (this.state.isLoading && this.props.currentItem !== prevProps.currentItem) {
            this.setState({ isLoading: false });
        }
        // if (this.props.userLocation !== prevProps.userLocation) {
        //     console.log('set this here');
        //     console.log(this.props.userLocation);
        //     this.setState({ loadingLocation: false });
        // }   
    }
    render() {
        let { isLoading, loadingLocation } = this.state;
        let { currentItem, userLocation  } = this.props;
        let userLocationStorage = JSON.parse(localStorage.getItem('userLocation'));
        console.log("userLocationStorage");
        console.log(userLocationStorage);
        if (!currentItem) currentItem = {};
        console.log("currentItem");
        console.log(currentItem);
        return (
            <Shell>
                {isLoading ? <div className="loading-spinner"> <MDSpinner size={50} singleColor="#FEC04A" color2="#673ab7" /> </div> : currentItem !== null ?
                    <div className="product-view-page">
                        {/* <img src={ currentItem.category.image_url } /> */}
                        
                        <div className="product-snapshot">
                            <img src={currentItem.category.image_url} />
                            <div className="product-snapshot-details">
                                <h1>{currentItem.name} </h1>
                                <span> {currentItem.price} / {currentItem.unit_of_measure} </span>
                                <br/>
                                <span> {currentItem.description} </span>
                                {loadingLocation ?
                                    <div className="product-availability">
                                        <span> {currentItem.vendor.name} closest location:</span>
                                        <span> Name: {findClosestLocation(userLocationStorage, currentItem.vendor.locations).name} </span>
                                        <span> Distance: { findClosestLocation(userLocationStorage, currentItem.vendor.locations).distanceFrom.toFixed(2)} miles </span>
                                        <span> Address: {findClosestLocation(userLocationStorage, currentItem.vendor.locations).address} </span>
                                        <span> {findClosestLocation(userLocationStorage, currentItem.vendor.locations).city} {findClosestLocation(userLocationStorage, currentItem.vendor.locations).state}</span>
                                    </div>
                                    :
                                    <div className="product-availability">
                                        <span> {currentItem.vendor.name} closest location:</span>
                                        <span> Name: {findClosestLocation(userLocation, currentItem.vendor.locations).name} </span>
                                        <span> Distance: {findClosestLocation(userLocation, currentItem.vendor.locations).distanceFrom.toFixed(2)} miles </span>
                                        <span> Address: {findClosestLocation(userLocation, currentItem.vendor.locations).address} </span>
                                        <span> {findClosestLocation(userLocation, currentItem.vendor.locations).city} {findClosestLocation(userLocation, currentItem.vendor.locations).state}</span>
                                        
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className="vendor-snapshot">
                            <div className="vendor-snapshot-details">
                                <h2>{currentItem.vendor.name} </h2>
                                <span> {currentItem.vendor.address} </span>
                                <span> {currentItem.vendor.city}, {currentItem.vendor.state} {currentItem.vendor.zip} </span>
                                <Link className="" to={{ pathname: `/vendors/${currentItem.vendor.id}` }} > <button className="button-default"> View More </button> </Link>
                            </div>
                            <img src={ currentItem.vendor.image_url } />
                        </div>
                    </div>
                    : <p>no product found </p>
                }
            </Shell>
        );
    }
}

let mapStateToProps = (state, props) => ({
    currentItem: state.currentItem,
    userLocation: state.userLocation
});

let ProductViewScreenState = connect(
    mapStateToProps
)(ProductViewScreen);

export default ProductViewScreenState;
