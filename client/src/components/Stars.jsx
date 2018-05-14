import React from 'react';

let Stars = () =>
    <div className="stars" data-stars="1" onClick={({ target }) => {
        while (!target.classList.contains('star')) target = target.parentElement;
        target.parentElement.setAttribute('data-stars', target.getAttribute('data-rating'));
    }}>
        {[...Array(5).keys()].map((c, i) =>
            <svg key={`${i}`} height="25" width="23" className="star rating" data-rating={c + 1}>
                <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" />
            </svg>
        )}
    </div>

export default Stars;
