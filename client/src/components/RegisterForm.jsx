import React, { Component } from 'react';
import EnhanceForm from './EnhanceForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createAccountAC } from '../redux/actions';
import { toggleLoginModal } from '../redux/actions';
import { setToken } from '../redux/actions';

export const RegisterForm = ({ state, handleSubmit, handleChange, history, dispatch, toggleLoginModal, createAccountAC, setToken }) =>
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
        <button className="button-default" 
            onClick={event => createAccountAC(
                {
                    email: state.email,
                    password: state.password,
                    username: state.username,
                    firstname: state.firstname,
                    lastname: state.lastname
                })
                // .then(token => { localStorage.setItem('token', JSON.stringify(token)); return token })
                .then(token =>{ console.log(token); setToken(token)   })  
                .then( () => { toggleLoginModal()} )
                // .then(res => history.push('/'))
                // .catch(err => console.log(err))
            }> Create Account</button>
    </form>

let mapStateToProps = (state, props) => state;
let mapDispatchToProps = dispatch => (
    {
        toggleLoginModal: booleanVal => dispatch(toggleLoginModal(booleanVal)),
        createAccountAC: user => createAccountAC(dispatch, user),
        setToken: (token) => dispatch(setToken(token))
    }
);
let RegisterFormState = connect(
    mapStateToProps,
    mapDispatchToProps
)(RegisterForm);

const EnhancedForm = EnhanceForm(RegisterFormState);
export default EnhancedForm;