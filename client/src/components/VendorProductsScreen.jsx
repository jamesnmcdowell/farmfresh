import React from 'react';
import { Link } from 'react-router-dom';
import VendorProducts from "./VendorProducts";
import Shell from './Shell';
import VendorDashboardNav from './VendorDashboardNav';
import { withState } from 'recompose';
import EnhancedProductForm from './ProductForm';

let VendorProductsScreen = ({ match, addFormOpen, toggleForm }) =>
    <Shell>
        <VendorDashboardNav />
        <div className="vendor-dashboard-add ">
            <button className="button-default"
                onClick={() => { toggleForm(!addFormOpen); }}
            > Add Product </button>
        </div>
        {addFormOpen ?
            <div className="login-form-wrapper">
                <EnhancedProductForm
                    initialState={{
                        toggleForm: toggleForm,
                        name: '',
                        description: '',
                        category_id: '',
                        unit_of_measure: '',
                        price: ''
                    }} />
            </div> 
        : 
            <VendorProducts />
        }
    </Shell >

let VendorProductsScreenLocalState = withState(
    "addFormOpen",
    "toggleForm",
    false
)(VendorProductsScreen);


export default VendorProductsScreenLocalState;