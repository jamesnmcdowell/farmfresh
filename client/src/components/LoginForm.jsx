import React, { Component } from 'react';
import EnhanceForm from './EnhanceForm';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAccountAC } from '../redux/actions';
import { toggleLoginModal } from '../redux/actions';
import { setToken } from '../redux/actions';

export const LoginForm = ({ state, handleSubmit, handleChange, history, toggleLoginModal, loginAccountAC, setToken, dispatch }) =>
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
        <button className="button-default"
            onClick={event => loginAccountAC(
                {
                    email: state.email,
                    password: state.password
                })

                .then(token => { console.log(token); setToken(token) })
                .then(() => { toggleLoginModal() })
                // .then(token => { localStorage.setItem('token', JSON.stringify(token)); return token })
                // .then(token => { console.log(token); setToken(token) })
                // .then(() => { toggleLoginModal() })
                // .then(res => history.push('/'))
                // .catch(err => console.log(err))
            } >Sign In</button>
    </form>


let mapStateToProps = (state, props) => state;
let mapDispatchToProps = dispatch => (
    {
        toggleLoginModal: booleanVal => dispatch(toggleLoginModal(booleanVal)),
        loginAccountAC: user => loginAccountAC(dispatch, user),
        setToken: (token) => dispatch(setToken(token))
    }
);
let LoginFormState = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);

const EnhancedForm = EnhanceForm(LoginFormState);
export default EnhancedForm;