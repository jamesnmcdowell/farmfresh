import React, {Fragment} from 'react';
import { toggleLoginModal } from '../redux/actions';
import { checkForm } from '../redux/actions';
import { connect } from 'react-redux';
import { toggleMobileMenu } from '../redux/actions';
import { Link } from 'react-router-dom';

let MobileMenu = ({ menuOpen, toggleMobileMenu, toggleLoginModal, checkForm, currentUser}) => {
    console.log('sdf ' + menuOpen);

    return (
    <div className={(menuOpen) ? "mobile-menu-wrapper menu-open" : "mobile-menu-wrapper"}>
        <ul className="mobile-menu-list">
            <li>
                    <Link to="/" onClick={() => { toggleMobileMenu(); }}>
                    <div>
                        <span>Home</span>
                    </div>
                </Link>
            </li>
            <li>
                <hr/>
		    </li>
            <li>
                <Link to="/become-a-vendor" onClick={() => { toggleMobileMenu(); }}>
                    <div>
                        <span>Become a Vendor</span>
                    </div>
                </Link>
            </li>
        {currentUser ?
            <Fragment>
            <li>
                <hr />
            </li>
            <li>
                <div className="anchor-actions" onClick={() => { toggleLoginModal(); checkForm('signUp'); toggleMobileMenu(); }}>
                    <span>Account</span>
                </div>
            </li>
            <li>
                <a href="/" >
                    <div>
                        <span>About</span>
                    </div>
                </a>
            </li>   
            <li>
                <div className="anchor-actions">
                    <span>Log out</span>
                </div>
            </li>  
            </Fragment>
            :
            <Fragment>
            <li>
                <div className="anchor-actions" onClick={() => { toggleLoginModal(); checkForm('signUp'); toggleMobileMenu(); }}>
                    <span>Sign up</span>
                </div>
            </li>
            <li>
                <div className="anchor-actions" onClick={() => { toggleLoginModal(); checkForm('signIn'); toggleMobileMenu(); }}>
                    <span>Sign In</span>
                </div>
            </li>
            <li>
                <a href="/" >
                    <div>
                        <span>About</span>
                    </div>
                </a>
            </li>
            </Fragment>
        }
        </ul>
    </div>
    )       
       
}
let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
    currentUser: state.currentUser
});
let mapDispatchToProps = dispatch => (
    {
        toggleMobileMenu: booleanVal => dispatch(toggleMobileMenu(booleanVal)),
        toggleLoginModal: booleanVal => dispatch(toggleLoginModal(booleanVal)),
        checkForm: string => dispatch(checkForm(string))
    }
);

let MobileMenuState = connect(
    mapStateToProps,
    mapDispatchToProps
)(MobileMenu);

export default MobileMenuState;