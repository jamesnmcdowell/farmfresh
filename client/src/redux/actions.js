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

toggleMobileMenu.toString = () => 'TOGGLE_MOBILE_MENU';
toggleLoginModal.toString = () => 'TOGGLE_LOGIN_MODAL';
checkForm.toString = () => 'CHECK_FORM';