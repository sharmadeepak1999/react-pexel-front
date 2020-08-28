import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    username: '',
    loading: false
};

const authStart = ( state, action ) => {
    return {
        ...state,
        loading: true
    }
};

const authSuccess = (state, action) => {
    return {
        ...state,
        token: action.token,
        username: action.username,
        loading: false
    }
};

const authLogout = (state, action) => {
    return {
        ...state,
        token: null
    }
};


const authFail = (state, action) => {
    return{
        ...state,
        loading: false
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.AUTH_START: return authStart(state, action)
        case actionTypes.AUTH_FAIL: return authFail(state, action)
        default:
            return state;
    }
};

export default reducer;