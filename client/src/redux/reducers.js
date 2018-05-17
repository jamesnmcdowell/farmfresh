import {
    toggleMobileMenu,
    toggleLoginModal,
    checkForm,
    setToken,
    updateProductsAC,
    updateVendorByIdAC,
    updateUserLocationAC,
    createAccountAC,
    createVendorAC,
    updateVendorDataAC,
    addProductAC,
    addLocationAC,
    updateAllLocationsAC
} from './actions';

import db from '../db';


const initialState = {
    locations: [],
    products: {},
    menuOpen: false,
    modalOpen: false,
    formType: 'logIn',
    currentVendor: null,
    userLocation: null,
    currentUser: null,
    isVendor: true,
    vendorProfile: null,
    vendorProducts: null,   
    vendorLocations: null, 
    allLocations: null 
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
    [updateUserLocationAC]: (state, action) => ({
        ...state, userLocation: action.payload
    }),
    [setToken]: (state, action) => ({
        ...state, currentUser: action.payload
    }),
    [createAccountAC]: (state, action) => ({
        ...state, currentUser: action.payload
    }),
    [createVendorAC]: (state, action) => ({
        ...state, currentUser: action.payload
    }),
    [updateVendorDataAC]: (state, action) => ({
        ...state, vendorProfile: action.payload.profile, vendorProducts: action.payload.products, vendorLocations: action.payload.locations,  
    }),
    [addProductAC]: (state, action) => ({
        ...state
    }),
    [addLocationAC]: (state, action) => ({
        ...state
    }),
    [updateAllLocationsAC]: (state, action) => ({
        ...state, allLocations: action.payload
    }),
    default: (state, action) => state
}

const rootReducer = (state = initialState, action) => {
    let reducerAction = reducerRoutes[action.type] || reducerRoutes.default
    return reducerAction(state, action)
}

export default rootReducer;