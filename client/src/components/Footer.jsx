import React from 'react';
import { Link } from 'react-router-dom';

let Footer = () =>
    <footer>
        <div className="footer-container">
            <div className="consumer-links">
                <span> Explore </span>
                <Link to="/categories/clothes">Contact</Link>
                <Link to="/categories/kitchen">FAQ</Link>
                <Link to="/categories/decor">Shipping</Link>
                <Link to="/categories/decor">Returns</Link>
            </div>
            <div className="vendor-links">
                <span> Become a Vendor </span>
                <Link to="/categories/clothes">Contact</Link>
                <Link to="/categories/kitchen">FAQ</Link>
                <Link to="/categories/decor">Shipping</Link>
                <Link to="/categories/decor">Returns</Link>
            </div>
            <div className="about-links">
                <span> About </span>
                <Link to="/categories/clothes">Contact</Link>
                <Link to="/categories/kitchen">FAQ</Link>
                <Link to="/categories/decor">Shipping</Link>
                <Link to="/categories/decor">Returns</Link>
            </div>
            <div className="social-links">
                <span> Follow Us! </span>
                <p> @farmfresh </p>
                <div className="social-icons">
                    <Link to="/categories/clothes"><img className="twitter-icon" src="https://cdn3.iconfinder.com/data/icons/peelicons-vol-1/50/Twitter-256.png" /></Link>
                    <Link to="/categories/kitchen"><img className="instagram-icon" src="https://cdn3.iconfinder.com/data/icons/peelicons-vol-1/50/Intsagram-256.png" /></Link>
                    <Link to="/categories/decor"><img className="youtube-icon" src="https://cdn3.iconfinder.com/data/icons/peelicons-vol-1/50/YouTube-256.png" /></Link>
                </div>
            </div>
           
        </div>
    </footer>

export default Footer;