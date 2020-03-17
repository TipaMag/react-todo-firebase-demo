import { app } from './../firebase-config'

import { initializedSuccess } from './app-reducer'

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA'

let initialState = {
    isAuth: false,
    currentUser: {
        displayName: null,
        email: '',
        emailVerified: false,
        photoURL: null,
        isAnonymous: false,
        uid: '',
        providerData: []
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_USER_DATA:
            return {
                ...state,
                isAuth: action.isAuth,
                currentUser: action.payload
            }
        default:
            return state
    }
}


const setAuthUserData = (displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData, isAuth) => ({
    type: SET_AUTH_USER_DATA,
    payload: { displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData },
    isAuth
})

export const subscribeAuthStateChanged = () => (dispatch) => {
    app.auth().onAuthStateChanged((user) => {
        if (user) {
            let {displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData} = user
            dispatch(setAuthUserData(displayName, email, emailVerified, photoURL, isAnonymous, uid, providerData, true))
            dispatch(initializedSuccess())
        } else {
            dispatch(initializedSuccess())
        }
    })
}
export const login = (email, password) => (dispatch) => {
    return app.auth().signInWithEmailAndPassword(email, password)
}
export const registration = (email, password) => (dispatch) => {
    return app.auth().createUserWithEmailAndPassword(email, password)
}
export const logout = () => (dispatch) => {
    app.auth().signOut()
        .then(
            dispatch(setAuthUserData(null, '', false, null, false, '', [], false))
        )
}

export default authReducer