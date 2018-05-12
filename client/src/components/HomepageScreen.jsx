import React, { Component } from 'react';
import { connect } from 'react-redux';
import Shell from './Shell';
import { Link } from 'react-router-dom';
import lettuce from '../assets/lettuce.jpg';
import market from '../assets/farmers-market-buy.jpg';
import marketWide from '../assets/farmers-market-buy-wide.jpg';
import cropsGreenhouse from '../assets/crops-greenhouse.jpg';
import cows from '../assets/cows.jpg';
import strawberryBasket from '../assets/strawberry-basket.jpg';
import strawberryPicking from '../assets/strawberry-picking.jpg';
import connection from '../assets/connect.svg';

class HomepageScreen extends Component {
    componentDidMount() {
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    render() {
        return (
            <Shell>
                <div className="homepage-wrapper">
                   
                    <div className="homepage-grid">
                            <img className="hgrid-1" src={strawberryPicking} />
                        <div className="hgrid-slogan">
                            <h2>Summer is here. </h2>
                            <p>Enjoy it with the freshest seasonal produce</p>
                            <Link to="/"><button className="button-default">View</button> </Link>
                        </div>
                        <div className="hgrid-2">
                            <h2>About farmfresh </h2>
                            <p>We strive to connect people with local farms</p>
                            <Link to="/"><button className="button-default">Learn More</button> </Link>
                        </div>
                        <img className="hgrid-3" src={cows} />
                    </div>
                </div>
            </Shell>
        );
   
    }
}

let mapStateToProps = (state, props) => ({
    menuOpen: state.menuOpen,
});

let HomepageScreenState = connect(
    mapStateToProps,
)(HomepageScreen);

export default HomepageScreenState;