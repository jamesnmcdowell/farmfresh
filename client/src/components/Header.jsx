import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/farmfresh-logo.svg';
import menuDownIcon from '../assets/menu-open.svg';
import SearchBar from './SearchBar';
import { connect } from 'react-redux';
import { toggleMobileMenu } from '../redux/actions';
import { toggleLoginModal } from '../redux/actions';
import { checkForm } from '../redux/actions';
import {withState} from 'recompose';
import ClickOutside from 'react-click-outside';
import { setToken } from '../redux/actions';

let Header = ({ menuOpen, toggleMobileMenu, toggleLoginModal, checkForm, currentUser, accountDropdown, toggleAccountDropdown, isVendor, setToken }) =>
    <div className="nav-bar">
        <div className="flex-nav">
            <div onClick={() => {toggleMobileMenu()}} className="logo-container" >
                <img className="logo" src={logo} />
                <img className="down-arrow" src={menuDownIcon} />
            </div>
            <SearchBar menuOpen={menuOpen} toggleMobileMenu={toggleMobileMenu}/>
            {currentUser ?
            <div className="menu-links">
                    {/* <Link to="/vendors" className="nav-link">
                        <span>Explore Vendors </span>
                    </Link> */}
                {isVendor ?
                    
                    <Link to="/vendor/profile" className="nav-link">
                        <span> Vendor Dashboard </span>
                    </Link>    
                :
                    <Link to="/become-a-vendor" className="nav-link">
                        <span> Become a Vendor</span>
                    </Link>
                }
                <ClickOutside onClickOutside={() => { toggleAccountDropdown(false); }}>

                <div onClick={() => { toggleAccountDropdown(!accountDropdown); }} className="header-user-details nav-link">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2000px-Missing_avatar.svg.png"/>
                    <span> {currentUser.user_name} </span>
                </div>
                {accountDropdown &&
                        <div className="account-dropdown">
                            <ul>
                                <li> Account Settings </li>
                                <li> Favorites </li>
                                <li> <div onClick={() => { localStorage.removeItem('currentUser'); setToken(null);  }} >  Sign out </div> </li>
                            </ul>
                        </div>
                }
                </ClickOutside>
            </div>
                        :
            <div className="menu-links">
                {/* <Link to="/vendors" className="nav-link">
                    <span>Explore Vendors </span>
                </Link> */}
                <Link to="/become-a-vendor" className="nav-link">
                    <span> Become a Vendor</span>
                </Link>
                <div onClick={() => { toggleLoginModal(); checkForm('signUp'); }} className="nav-link">
                    <span> Sign up</span>
                </div>
                <div onClick={() => { toggleLoginModal(); checkForm('signIn'); }} className="nav-link">
                    <span> Sign in</span>
                </div>
            </div>
            }
        </div>
    </div>

let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
    currentUser: state.currentUser,
    isVendor: state.isVendor
});
let mapDispatchToProps = dispatch => (
    { toggleMobileMenu: booleanVal => dispatch(toggleMobileMenu(booleanVal)),
      toggleLoginModal: booleanVal => dispatch(toggleLoginModal(booleanVal)),
      checkForm: string => dispatch(checkForm(string)),
      setToken: (token) => dispatch(setToken(token))
    }
);

let HeaderLocalState = withState(
    "accountDropdown",
    "toggleAccountDropdown",
    false
)(Header);

let HeaderState = connect(
    mapStateToProps,
    mapDispatchToProps
)(HeaderLocalState);

export default HeaderState;

