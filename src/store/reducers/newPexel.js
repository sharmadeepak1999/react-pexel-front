import * as actionTypes from '../actions/actionTypes';

const initialState = {
    success: false,
    loading: false
}

const uploadPexelStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const uploadPexelFail = (state, action) => {
    return {
        ...state,
        loading: false
    }
}

const uploadPexelEnd = (state, action) => {
    return {
        ...state,
        loading: false,
        success: true
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.UPLOAD_PEXEL_START: return uploadPexelStart( state, action );
        case actionTypes.UPLOAD_PEXEL_FAIL: return uploadPexelFail( state, action );
        case actionTypes.UPLOAD_PEXEL_END: return uploadPexelEnd( state, action );
        default: return state;
    }
};

export default reducer;