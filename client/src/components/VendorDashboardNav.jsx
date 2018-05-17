import React from 'react';
import { Link } from 'react-router-dom';

let VendorDashboardNav = () =>
    <div className="vendor-nav-container">
        <div className="vendor-nav-links">
            <Link to="/vendor/profile"><button className="">My Profile</button></Link>
            <Link to="/vendor/products"><button className="">My Products</button></Link>
            <Link to="/vendor/locations"><button className="">My Locations</button></Link>
        </div>
    </div>
export default VendorDashboardNav;