import React from 'react';
import {
    HashRouter,
    Route,
    Switch
} from 'react-router-dom';
import HomepageScreen from './components/HomepageScreen';
import MapScreen from './components/MapScreen';


let Router = () =>
    <HashRouter>
        <Switch>
            <Route path="/" exact component={HomepageScreen} />
            <Route path="/map" component={MapScreen} />
        </Switch>
    </HashRouter>

export default Router;
