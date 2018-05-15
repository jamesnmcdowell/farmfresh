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


let Router = () =>
    <HashRouter>
        <Switch>
            <Route path="/" exact component={HomepageScreen} />
            <Route path="/become-a-vendor" component={VendorSignupScreen} />
            <Route path="/map" component={MapScreen} />
            <Route path="/products/:type/:id" exact component={ProductListScreen} />
            <Route path="/vendor/:id" exact component={VendorScreen} />

        </Switch>
    </HashRouter>

export default Router;
