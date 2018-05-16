import { queryGraphQL, queryGraphQL2 } from '../ajax';
import { getMatchingLibraries } from '../util';

export const toggleMobileMenu = booleanVal =>
    ({
        type: toggleMobileMenu.toString(),
    });

export const toggleLoginModal = booleanVal =>
    ({
        type: toggleLoginModal.toString(),
    });
export const checkForm = string =>
    ({
        type: checkForm.toString(),
        payload: string
    });

export const setToken = token =>
    ({
        type: setToken.toString(),
        payload: token

    })

export const updateUserLocationAC = async (dispatch) => {
    try {
        navigator.geolocation.getCurrentPosition(function (position) {
            let userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            localStorage.setItem('userLocation', JSON.stringify(userLocation) );
            console.log(userLocation);
            dispatch({
                type: updateUserLocationAC.toString(),
                payload: userLocation
            });
        });
        
        
    } catch (e) {
        console.error(e);
    }
};  

export const updateVendorByIdAC = async (dispatch, id) => {
    let queryVendorById = `{
        vendor(id: ${id}) {
            id
            name
            locations {
                name
                description
                start_time
                end_time
                address
                city
                state
                zip
                valid_days
                lat
                lng
                
            }
        }
        }`
    try {
        let vendor = await queryGraphQL(queryVendorById);
        dispatch({
            type: updateVendorByIdAC.toString(),
            payload: vendor.data.vendor
        });
    } catch (e) {
        console.error(e);
    }
};    

    
export const updateProductsAC = async (dispatch, type, id) => {
    console.log("yoyoaction");
    let querySearch = `{
        items {
            name
            price
            unit_of_measure
            category {
                id
                name
                image_url
            }
            vendor {
                name
              	locations {
                  id
                  name
                  lat
                  lng
                  start_time
                  end_time
                  address
                  city
                  state
                  zip
              	}
            }  
            }
        }`
    let queryCategory = `{
        category(id:${id}) {
            id
            name 
            items {
                id
                name
                price
                unit_of_measure
                description   
                category {
                    id
                    name
                    image_url
                }
                vendor {
                    name
                    locations {
                    id
                    name
                    lat
                    lng
                    start_time
                    end_time
                    address
                    city
                    state
                    zip
                }
                }   
            }
            }
        }`
    try {
        // { products = [], filterData = {} };
        let products = [];
        switch (type) {
            case 'categories': 
                console.log('categories');
                products = await queryGraphQL(queryCategory); 
                products = products.data.category.items;
                break;
            case 'search': 
                console.log('search');
                id = id.slice(1);
                products = await queryGraphQL(querySearch);
                products = products.data.items;
                console.log(id);
                products = (id === "_") ? products : getMatchingLibraries(id, products);
                break;
            default: console.log('error');
        }
        dispatch({
            type: updateProductsAC.toString(),
            payload: products
        });
    } catch (e) {
        console.error(e);
    }
};

export const createAccountAC = async (dispatch, user) => {
    console.log("im inside");
    console.log(user);
    let createMutation = `mutation{
        signup (user_name: "${user.username}",first_name: "${user.firstname}", 
        last_name: "${user.lastname}",  
        email: "${user.email}", password: "${user.password}") {
            token
            is_vendor
            id
            user_name
            first_name
            last_name
            email
        }
    }`

    try {
        let payload = await queryGraphQL(createMutation);
        let currentUser = payload.data.signup;
        currentUser = { ...currentUser, is_vendor: false }
        console.log(currentUser);
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        dispatch({
            type: createAccountAC.toString(),
            payload: currentUser
        });
        return currentUser;
    } catch (e) {
        console.error(e);
    }  
};  

export const loginAccountAC = async (dispatch, user) => {
    console.log("im inside");
    console.log(user);
    let loginMutation = ` mutation {
		login ( email: "${user.email}", password: "${user.password}") {
			token
			id
			user_name
			first_name
            last_name
            is_vendor
	    }
    }`;
    try {
        let payload = await queryGraphQL(loginMutation);
        console.log(payload);
        let currentUser = payload.data.login;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        console.log(currentUser);
        dispatch({
            type: createAccountAC.toString(),
            payload: currentUser
        });
        return currentUser;
    } catch (e) {
        console.error(e);
    }
};  

export const createVendorAC = async (dispatch, userId) => {
    console.log("im inside");
    console.log(userId);
    let userLocalStorage = JSON.parse(localStorage.getItem('currentUser'));
    console.log(userLocalStorage);
    let userLocalStorageUpdated = { ...userLocalStorage, is_vendor: true };
    console.log(userLocalStorageUpdated);
    localStorage.setItem('currentUser', JSON.stringify(userLocalStorageUpdated));
    let createVendorMutation = `mutation{
      createVendor (id: "${userId}")
    }`;
    let payload = await queryGraphQL(createVendorMutation);
    try {
        dispatch({
            type: createAccountAC.toString(),
            payload: userLocalStorageUpdated
        });
    } catch (e) {
        console.error(e);
    }
}; 
    

toggleMobileMenu.toString = () => 'TOGGLE_MOBILE_MENU';
toggleLoginModal.toString = () => 'TOGGLE_LOGIN_MODAL';
checkForm.toString = () => 'CHECK_FORM';
setToken.toString = () => 'SET_TOKEN';
updateProductsAC.toString = () => 'UPDATE_PRODUCTS_AC';
updateVendorByIdAC.toString = () => 'UPDATE_VENDOR_BY_ID_AC';
updateUserLocationAC.toString = () => 'UPDATE_USER_LOCATION_AC';
createAccountAC.toString = () => 'CREATE_ACCOUNT_AC';
createVendorAC.toString = () => 'CREATE_VENDOR_AC';
loginAccountAC.toString = () => 'LOGIN_ACCOUNT_AC';