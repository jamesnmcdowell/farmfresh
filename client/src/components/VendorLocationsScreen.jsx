import React from 'react';
import { Link } from 'react-router-dom';
import VendorLocations from "./VendorLocations";
import Shell from './Shell';
import VendorDashboardNav from './VendorDashboardNav';
import { withState } from 'recompose';
import EnhancedLocationForm from './LocationForm';

let VendorLocationsScreen = ({ match, addFormOpen, toggleForm }) =>
    <Shell>
        <VendorDashboardNav />
        <div className="vendor-dashboard-add">
            <button className="button-default"
            onClick={() => { toggleForm(!addFormOpen); }}
            > Add Location </button>
        </div>
        {addFormOpen ?
            <div className="login-form-wrapper">
                <EnhancedLocationForm
                    initialState={{
                        toggleForm: toggleForm,
                        name: '',
                        description: '',
                        address: '',
                        city: '',
                        state: '',
                        zip: '',
                        start_time: '',
                        end_time: '',
                        monday: '',
                        tuesday: '',
                        wednesday: '',
                        thursday: '',
                        friday: '',
                        saturday: '',
                        sunday: '',
                        lat: '',
                        lng: ''
                    }} />
            </div> 
        : 
            <VendorLocations />
        }

    </Shell >

let VendorLocationsScreenLocalState = withState(
    "addFormOpen",
    "toggleForm",
    false
)(VendorLocationsScreen);


export default VendorLocationsScreenLocalState;