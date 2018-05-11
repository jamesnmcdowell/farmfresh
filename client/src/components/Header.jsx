import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/farmfresh-logo.svg';
import menuDownIcon from '../assets/menu-open.svg';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { toggleMobileMenu } from '../redux/actions';

let Header = ({ menuOpen, toggleMobileMenu }) =>
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
                <Link to="/" className="nav-link">
                    <span> Sign up</span>
                </Link>
                <Link to="/cart" className="nav-link">
                    <span> Sign in</span>
                </Link>
            </div>
        </div>
    </div>

let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
});
let mapDispatchToProps = dispatch => ({ toggleMobileMenu: booleanVal => dispatch(toggleMobileMenu(booleanVal)) })


let HeaderState = connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

export default HeaderState;

