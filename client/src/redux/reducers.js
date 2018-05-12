import {
    toggleMobileMenu,
    toggleLoginModal,
    checkForm
} from './actions';

import db from '../db';


const initialState = {
    locations: db.locations,
    menuOpen: false,
    modalOpen: false,
    formType: 'logIn'
};

const reducerRoutes = {
    [toggleMobileMenu]: (state, action) => ({
        ...state, menuOpen: !state.menuOpen
    }),
    [toggleLoginModal]: (state, action) => ({
        ...state, modalOpen: !state.modalOpen
    }),
    [checkForm]: (state, action) => ({
        ...state, formToggle: action.payload
    }),
    default: (state, action) => state
}

const rootReducer = (state = initialState, action) => {
    let reducerAction = reducerRoutes[action.type] || reducerRoutes.default
    return reducerAction(state, action)
}

export default rootReducer;