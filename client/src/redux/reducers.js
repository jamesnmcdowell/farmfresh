import {
    toggleMobileMenu,
    toggleLoginModal,
    checkForm,
    updateProductsAC,
    updateVendorByIdAC
} from './actions';

import db from '../db';


const initialState = {
    locations: db.locations,
    products: {},
    menuOpen: false,
    modalOpen: false,
    formType: 'logIn',
    currentVendor: {}
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
    [updateProductsAC]: (state, action) => ({
        ...state, products: action.payload
    }),
    [updateVendorByIdAC]: (state, action) => ({
        ...state, currentVendor: action.payload
    }),
    default: (state, action) => state
}

const rootReducer = (state = initialState, action) => {
    let reducerAction = reducerRoutes[action.type] || reducerRoutes.default
    return reducerAction(state, action)
}

export default rootReducer;