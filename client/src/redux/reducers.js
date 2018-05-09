import {
} from './actions';

import db from '../db';


const initialState = {
    locations: db.locations
};

const reducerRoutes = {

    default: (state, action) => state
}

const rootReducer = (state = initialState, action) => {
    let reducerAction = reducerRoutes[action.type] || reducerRoutes.default
    return reducerAction(state, action)
}

export default rootReducer;