import React, { Component } from 'react';
import EnhanceForm from './EnhanceForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProductAC  } from '../redux/actions';

export const ProductForm = ({ state, handleSubmit, handleChange, history, dispatch, addProductAC, toggleForm}) =>
    <form className="login-form" onSubmit={handleSubmit}>
        <label> name </label>
        <div>
            <input
                type="text" name="name"
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
        <label> category </label>
        <select
            name="category_id"
            value={state.category_id}
            onChange={handleChange}>
            <option value="1">
                Dairy and Eggs
            </option>
            <option value="2">
                Fruits and Vegetables
            </option>
            <option value="3">
                Meat and Seafood
            </option>
            <option value="4">
                Personal Care
            </option>
            <option value="5">
                Canned and Packaged
            </option>
        </select>
        <br />
        <label> unit of measurement </label>
        <div>
            <input
                type="text"
                name="unit_of_measure"
                value={state.unit_of_measure}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> price </label>
        <div>
            <input
                type="text"
                name="price"
                value={state.price}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <button className="button-default"
            onClick={event => addProductAC(
                {
                    name: state.name,
                    description: state.description,
                    category_id: state.category_id,
                    unit_of_measure: state.unit_of_measure,
                    price: state.price
                })
                .then( () => {state.toggleForm(false); })
            }> Create Account</button>
    </form>

let mapStateToProps = (state, props) => state;
let mapDispatchToProps = dispatch => (
    {
        addProductAC: user => addProductAC(dispatch, user),
    }
);
let ProductFormState = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProductForm);

const EnhancedForm = EnhanceForm(ProductFormState);
export default EnhancedForm;