import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userAuth: localStorage.getItem('state') ? localStorage.getItem('state') : false,
    drawer: false,
    profiles: localStorage.getItem('prof') ? JSON.parse(localStorage.getItem('prof')) : null,
    category_id: null,
    userStatus: null,
    adminRole: localStorage.getItem('role') ? localStorage.getItem('role') : null,
    shopSlug: null,
}


const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loggedIn: (state, action) => {

            state.userAuth = action.payload
            localStorage.setItem('state', state.userAuth)
        },
        colorsUpdate: (state, action) => {

            state.userStatus = action.payload
        },
        profileDetails: (state, action) => {

            state.profiles = action.payload
            const vale = JSON.stringify(state.profiles)
            localStorage.setItem('prof', vale)
        },

        loggedOut: (state, action) => { state.userAuth = action.payload },

        drawerOpen: (state, action) => { state.drawer = action.payload },

        subcat: (state, action) => { state.category_id = action.payload },

        roles: (state, action) => {
            state.adminRole = action.payload
            // state.adminRole.push(action.payload)
            localStorage.setItem('role', state.adminRole)
        },
        updateProfileDetails: (state, action) => {
            state.profiles = action.payload;
            localStorage.setItem('prof', JSON.stringify(action.payload));
        },
        updateShopSlug: (state, action) => {
            state.shopSlug = action.payload;
            localStorage.setItem("shopId", action.payload);
        }
    },


})

export const { 
    loggedOut, 
    loggedIn, 
    drawerOpen, 
    profileDetails, 
    subcat, 
    updateProfileDetails, 
    colorsUpdate, 
    roles, 
    updateShopSlug, 
} = LoginSlice.actions
export const loginStatus = (state) => state.login
export default LoginSlice.reducer