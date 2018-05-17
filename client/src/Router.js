import React from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import HomepageScreen from './components/HomepageScreen';
import MapScreen from './components/MapScreen';
import ProductListScreen from './components/ProductListScreen';
import VendorScreen from './components/VendorScreen';
import VendorSignupScreen from './components/VendorSignupScreen';
import VendorLocationsScreen from './components/VendorLocationsScreen';
import VendorProductsScreen from './components/VendorProductsScreen';
import VendorProfile from './components/VendorProfile';
import ExploreVendors from './components/ExploreVendors';


let Router = () =>
    <HashRouter>
        <Switch>
            <Route path="/" exact component={HomepageScreen} />
            <Route path="/become-a-vendor" component={VendorSignupScreen} />
            <Route path="/map" component={MapScreen} />
            <Route path="/products/:type/:id" exact component={ProductListScreen} />
            <Route path="/vendors/:id" exact component={VendorScreen} />
            <Route path="/vendor/profile" exact component={VendorProfile} />
            <Route path="/vendor/products" exact component={VendorProductsScreen} />
            <Route path="/vendor/locations" exact component={VendorLocationsScreen} />
            <Route path="/vendors" exact component={ExploreVendors} />


        </Switch>
    </HashRouter>

export default Router;
