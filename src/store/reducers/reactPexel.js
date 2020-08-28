import * as actionTypes from '../actions/actionTypes';

const initialState = {
    images: [],
    loading: true
}

const setImages = ( state, action ) => {
    return {
        ...state,
        images: action.images,
        loading: false
    }
};

const searchImageStart = ( state, action ) => {
    return {
        ...state,
        loading: true
    }
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.SET_IMAGES: return setImages( state, action );
        case actionTypes.SEARCH_IMAGES_START: return searchImageStart( state, action );
        default: return state;
    }
};

export default reducer;