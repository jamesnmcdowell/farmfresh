import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileMenu from './MobileMenu';
import { connect } from 'react-redux';
import LoginModal from './LoginModal';

let Shell = ({ children, menuOpen, modalOpen }) =>
    <div className="Site">
        <Header className="Site-header" />
        <div className="Site-content">
        <MobileMenu menuOpen={menuOpen}/>
            {children}
        </div>
        <LoginModal modalOpen={modalOpen}/>
        <Footer className="Site-footer"/>
    </div>
    
let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
    modalOpen: state.modalOpen,
});

let ShellState = connect(
    mapStateToProps,
)(Shell);

export default ShellState;