import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/farmfresh-logo.svg';
import menuDownIcon from '../assets/menu-open.svg';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { toggleMobileMenu } from '../redux/actions';
import { toggleLoginModal } from '../redux/actions';
import { checkForm } from '../redux/actions';

let Header = ({ menuOpen, toggleMobileMenu, toggleLoginModal, checkForm }) =>
    <div className="nav-bar">
        <div className="flex-nav">
            <div onClick={() => {toggleMobileMenu()}} className="logo-container" >
                <img className="logo" src={logo} />
                <img className="down-arrow" src={menuDownIcon} />
            </div>
            <SearchBar/>
            <div className="menu-links">
        
                <Link to="/login" className="nav-link">
                    <span> Become a Vendor</span>
                </Link>
                <div onClick={() => { toggleLoginModal(); checkForm('signUp'); }} className="nav-link">
                    <span> Sign up</span>
                </div>
                <div onClick={() => { toggleLoginModal(); checkForm('signIn'); }} className="nav-link">
                    <span> Sign in</span>
                </div>
            </div>
        </div>
    </div>

let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
});
let mapDispatchToProps = dispatch => (
    { toggleMobileMenu: booleanVal => dispatch(toggleMobileMenu(booleanVal)),
      toggleLoginModal: booleanVal => dispatch(toggleLoginModal(booleanVal)),
      checkForm: string => dispatch(checkForm(string))
    }
);

let HeaderState = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderState;

