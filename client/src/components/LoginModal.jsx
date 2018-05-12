import React, { Component } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { toggleLoginModal } from '../redux/actions';
import EnhancedLoginForm from './LoginForm'
import EnhancedRegisterForm from './RegisterForm';
import { checkForm } from '../redux/actions';


class LoginModal extends React.Component {
    render() {
        let { modalOpen, formType, toggleLoginModal, checkForm} = this.props;
        return (
            <div>
                <Modal
                    isOpen={modalOpen}
                    contentLabel="onRequestClose Example"
                    onRequestClose={toggleLoginModal}
                    className="Modal"
                    overlayClassName="Overlay"
                >
                {formType === "signUp" ?
                    <div className="login-form-wrapper">
                        <EnhancedRegisterForm
                            initialState={{
                                email: '',
                                password: '',
                                username: '',
                                firstname: '',
                                lastname: ''
                            }} /> 
                        <div className="form-switch">
                            <span> Already have an farmfresh account? <span onClick={() => { checkForm('signIn'); }} > Sign in </span> </span>
                        </div>
                    </div>      
                           :
                    <div className="login-form-wrapper">
                        <EnhancedLoginForm
                            initialState={{
                                email: '',
                                password: ''
                            }} />
                        <div className="form-switch">
                            <span> Don’t have an account? <span onClick={() => { checkForm('signUp'); }} > Sign up </span> </span>
                        </div>          
                    </div>   
                }
                </Modal>
            </div>
        );
    }
}

let mapStateToProps = (state, props) => ({
    modalOpen: state.modalOpen,
    formType: state.formToggle
});
let mapDispatchToProps = dispatch => (
    {
        toggleLoginModal: booleanVal => dispatch(toggleLoginModal(booleanVal)),
        checkForm: string => dispatch(checkForm(string))
    }
);

let LoginModalState = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginModal);

export default LoginModalState;