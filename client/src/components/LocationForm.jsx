import React, { Component } from 'react';
import EnhanceForm from './EnhanceForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLocationAC } from '../redux/actions';

export const ProductForm = ({ state, handleSubmit, handleChange, history, dispatch, addLocationAC, toggleForm }) =>
    <form className="login-form" onSubmit={handleSubmit}>
        <label> name </label>
        <div>
            <input
                type="text" 
                name="name"
                value={state.name}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> description </label>
        <div>
            <input
                type="text"
                name="description"
                value={state.description}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> Address </label>
        <div>
            <input
                type="text" name="address"
                value={state.address}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> City </label>
        <div>
            <input
                type="text" name="city"
                value={state.city}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> State </label>
        <div>
            <input
                type="text" name="state"
                value={state.state}
                onChange={handleChange}
                required="" />
        </div>
        <br />                
        <label> Zip </label>
        <div>
            <input
                type="text" name="zip"
                value={state.zip}
                onChange={handleChange}
                required="" />
        </div>
        <br /> 
        <label> Start time </label>
        <div>
            <input
                type="text" name="start_time"
                value={state.start_time}
                onChange={handleChange}
                required="" />
        </div>
        <br />   
        <label> End time </label>
        <div>
            <input
                type="text" name="end_time"
                value={state.end_time}
                onChange={handleChange}
                required="" />
        </div>
        <br />                  
        <label> Monday </label>
        <select
            name="monday"
            value={state.monday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>
        <label> Tuesday </label>
        <select
            name="tuesday"
            value={state.tuesday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>
        <label> Wednesday </label>
        <select
            name="wednesday"
            value={state.wednesday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>
        <label> Thursday </label>
        <select
            name="thursday"
            value={state.thursday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>
        <label> Friday </label>
        <select
            name="friday"
            value={state.friday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>
        <label> Saturday </label>
        <select
            name="saturday"
            value={state.saturday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>
        <label> Sunday </label>
        <select
            name="sunday"
            value={state.sunday}
            onChange={handleChange}>
            <option value={true}>
                Yes
            </option>
            <option value={false}>
                No
            </option>
        </select>                 
        <br />
        <label> Latitude </label>
        <div>
            <input
                type="text"
                name="lat"
                value={state.lat}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> Longitude </label>
        <div>
            <input
                type="text"
                name="lng"
                value={state.lng}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <button className="button-default"
            onClick={event => addLocationAC(
                {
                    name: state.name,
                    description: state.description,
                    address: state.address,
                    city: state.city,
                    state: state.state,
                    zip: state.zip,
                    start_time: state.start_time,
                    end_time: state.end_time,
                    monday: state.monday,
                    tuesday: state.tuesday,
                    wednesday: state.wednesday,
                    thursday: state.thursday,
                    friday: state.friday,
                    saturday: state.saturday,
                    sunday: state.sunday,
                    lat: state.lat,
                    lng: state.lng   
                })
                .then(() => { state.toggleForm(false); })
            }> Create Account</button>
    </form>

let mapStateToProps = (state, props) => state;
let mapDispatchToProps = dispatch => (
    {
        addLocationAC: user => addLocationAC(dispatch, user),
    }
);
let ProductFormState = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductForm);

const EnhancedForm = EnhanceForm(ProductFormState);
export default EnhancedForm;