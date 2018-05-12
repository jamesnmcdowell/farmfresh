import React, { Component } from 'react';
import EnhanceForm from './EnhanceForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

export const RegisterForm = ({ state, handleSubmit, handleChange, history }) =>
    <form className="login-form" onSubmit={handleSubmit}>
        <label> Email </label>
        <div>
            <input
                type="text" name="email"
                value={state.email}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> Password </label>
        <div>
            <input
                type="text"
                name="password"
                value={state.password}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> Username </label>
        <div>
            <input
                type="text"
                name="username"
                value={state.username}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> First Name </label>
        <div>
            <input
                type="text"
                name="firstname"
                value={state.firstname}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <label> Last Name </label>
        <div>
            <input
                type="text"
                name="lastname"
                value={state.lastname}
                onChange={handleChange}
                required="" />
        </div>
        <br />
        <button className="button-default" >Create Account</button>
    </form>

const EnhancedForm = EnhanceForm(RegisterForm);
export default EnhancedForm;