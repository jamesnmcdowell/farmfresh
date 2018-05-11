import React from 'react';

let MobileMenu = ({menuOpen}) => {
    console.log('sdf ' + menuOpen);

    return (
    <div className={(menuOpen) ? "mobile-menu-wrapper menu-open" : "mobile-menu-wrapper"}>
        <ul className="mobile-menu-list">
            <li>
                <a href="/" >
                    <div>
                        <span>Home</span>
                    </div>
                </a>
            </li>
            <li>
                <hr className="_1qenmrf"/>
		    </li>
            <li>
                <a href="/" >
                    <div>
                        <span>Home</span>
                    </div>
                </a>
            </li>
            <li>
                <hr className="_1qenmrf" />
            </li>
            <li>
                <a href="/" >
                    <div>
                        <span>Home</span>
                    </div>
                </a>
            </li>
            <li>
                <a href="/" >
                    <div>
                        <span>Home</span>
                    </div>
                </a>
            </li> 
            <li>
                <a href="/" >
                    <div>
                        <span>Home</span>
                    </div>
                </a>
            </li>             
        </ul>
        </div> 
    )
}

export default MobileMenu;