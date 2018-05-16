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
      signup (user_name: "${user.username}",first_name: "${user.firstname}", last_name: "${user.lastname}",  email: "${user.email}", password: "${user.password}")
    }`
    try {
        let payload = await queryGraphQL(createMutation);
        let currentUser = payload.data.signup;
        localStorage.setItem('currentUser', currentUser);
        dispatch({
            type: createAccountAC.toString(),
            payload: JSON.parse(currentUser,10)
        });
        return currentUser;
    } catch (e) {
        console.error(e);
    }  
};  

export const updateVendorStatusAC = async (dispatch, userId) => {
    console.log("im inside");
    let vendorStatusMutation = `mutation{
      updateVendorStatus (id: "${userId}",is_vendor: "${true}")
    }`
    try {
        let payload = await queryGraphQL(vendorStatusMutation);
        dispatch({
            type: createAccountAC.toString(),
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


// export let createAccount = (user) =>
//     fetch('/users', {
//         body: JSON.stringify(user),
//         method: 'POST',
//         headers: {
//             'content-type': 'application/json'
//         }
//     })
//         .then(res => res.json())