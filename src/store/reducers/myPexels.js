import * as actionTypes from '../actions/actionTypes';

const initialState = {
    pexelsData: [],
    loading: true
}

const setPexels = ( state, action ) => {
    return {
        ...state,
        pexelsData: action.pexels,
        loading: false
    }
};

const deletePexelsStart = (state, action) => {
    return {
        ...state,
        loading: true
    }
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_PEXELS: return setPexels( state, action );
        case actionTypes.DELETE_PEXELS_START: return deletePexelsStart( state, action );
        default: return state;
    }
};

export default reducer;