import React, { Component } from 'react';
import { connect } from 'react-redux';
import LocationCard from './LocationCard';
import { updateAllLocationsAC } from '../redux/actions';
import Shell from './Shell';

class ExploreVendors extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }
    fetchProducts() {
        updateAllLocationsAC(this.props.dispatch);
    }
    componentDidMount() {
        this.fetchProducts();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.isLoading && this.props.allLocations && this.props.allLocations.length > 0) {
            this.setState({ isLoading: false });
        }
        if (this.state.isLoading && this.props.allLocations !== prevProps.allLocations) {
            this.setState({ isLoading: false });
        }
    }
    render() {
        let { isLoading } = this.state;
        let { allLocations } = this.props;
        if (!allLocations) allLocations = [];
        console.log("allLocations");
        console.log(allLocations);
        return (
            <Shell>
                <div className="product-list">
                    {isLoading ? <h1> loading </h1> : allLocations.length > 0 ?
                        allLocations.map((location, i) => <div key={`${location.id}_${i}`} location={location} > {location.name} {location.lat} {location.lng}</div>) :
                        <p>no locations found </p>
                    }
                </div>
            </Shell>
        );
    }
}

let mapStateToProps = (state, props) => ({
    allLocations: state.allLocations
});

let ExploreVendorsState = connect(
    mapStateToProps
)(ExploreVendors);

export default ExploreVendorsState;
