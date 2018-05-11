import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './MobileMenu';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: false,
            searchString: '',
            libraries: [{ name: 'eggs' }, { name: 'milk' }, { name: 'apples' }, { name: 'carrots' }, { name: 'oranges' }, { name: 'celery' }, { name:'honey'}]
        }
    }
    render() {
        let { libraries, suggestions } = this.state;
        let { setSearchResultRecipes } = this.props;
        let searchString = this.state.searchString.trim().toLowerCase();
        let handleChange = (event) => {
            this.setState({ searchString: event.target.value });
        }
        if (searchString.length > 0) libraries = libraries.filter((c) => c.name.toLowerCase().match(searchString));

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
                        <input onFocus={() => { this.setState({ suggestions: true }) }}
                        className="search" type="text" value={this.state.searchString} 
                        onChange={event => handleChange(event)} placeholder="Search for items" />
                        <Link to={`/recipes/search/_${this.state.searchString}`}>
                            <button className="search-button" >Search</button>
                        </Link>

                        {suggestions &&
                            <ul className="suggestions">
                                <li>dairy and eggs </li>
                                <li>produce </li>
                            </ul>
                        }
                        {searchString.length >= 1 &&
                            <ul className="suggestions">
                                {libraries.map((term) =>
                                    <Link to={`/recipes/${term.id}`}><li>{term.name}</li></Link>
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