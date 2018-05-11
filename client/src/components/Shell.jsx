import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';

let Shell = ({ children, menuOpen }) =>
    <div className="Site">
        <Header className="Site-header" />
        <div className="Site-content">
        <MobileMenu menuOpen={menuOpen}/>
            {children}
        </div>
        <Footer className="Site-footer"/>
    </div>
    
let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
});

let ShellState = connect(
    mapStateToProps,
)(Shell);

export default ShellState;