import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';
import { getMatchingLibraries } from '../util';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: false,
            searchString: '',
            libraries: [{ name: 'eggs' }, { name: 'milk' }, { name: 'apples' }, { name: 'carrots' }, { name: 'oranges' }, { name: 'celery' }, { name:'honey'}],
            librariesSearchSubset: []
        }
    }

    render() {
        let { libraries, suggestions, librariesSearchSubset } = this.state;
        let { setSearchResultRecipes, toggleMobileMenu, menuOpen} = this.props;
        let searchString = this.state.searchString.trim().toLowerCase();
        let handleChange = (event) => {
            this.setState({ searchString: event.target.value });
        }
        // if (searchString.length > 0) libraries = libraries.filter((c) => c.name.toLowerCase().match(searchString));
        if (searchString.length > 0) { librariesSearchSubset = getMatchingLibraries(searchString, libraries);}
        return (
            <div className="search-overlay-container ">
                {suggestions &&
                    <div onClick={(e) => {
                        this.setState({ suggestions: false })
                        this.setState({ searchString: '' });
                    }}
                    className="search-overlay">
                    </div>
                }   
                <div  className="search">
                    <form className="search-form">
                        <input onFocus={() => { this.setState({ suggestions: true }); }}
                        className="search" type="text" value={this.state.searchString} 
                        onChange={event => handleChange(event)} placeholder="Search for items" />
                        <Link to={`/products/search/_${this.state.searchString}`}>
                            <button onClick={() => { if(menuOpen) toggleMobileMenu(); }} className="search-button" >Search</button>
                        </Link>

                        {suggestions && searchString.length === 0 &&
                            <ul className="suggestions category-suggestions">
                                <li><Link to={`/products/categories/${1}`}>dairy &amp; eggs </Link></li>
                                <li><Link to={`/products/categories/${2}`}>fruits &amp; vegetables </Link></li>
                                <li><Link to={`/products/categories/${3}`}>meat &amp; seafood </Link></li>
                                <li><Link to={`/products/categories/${4}`}>personal care </Link></li>
                                <li><Link to={`/products/categories/${5}`}>canned &amp; packaged </Link></li>
                            </ul>
                        }
                        {searchString.length >= 1 &&
                            <ul className="suggestions product-suggestions">
                            {librariesSearchSubset.map((term, i) =>
                                    <Link key={i}to={`/recipes/${term.id}`}><li>{term.name}</li></Link>
                                )}
                            </ul>
                        }
                    </form>
                </div>
            </div>
        )
    }
}
            

export default SearchBar;