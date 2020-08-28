import * as actionTypes from './actionTypes';
import axios from '../../axios-pexel';

export const uploadPexelStart = () => {
    return {
        type: actionTypes.UPLOAD_PEXEL_START
    }
}

export const uploadPexelFail = () => {
    return {
        type: actionTypes.UPLOAD_PEXEL_FAIL
    }
}

export const uploadPexelEnd = () => {
    return {
        type: actionTypes.UPLOAD_PEXEL_END
    }
}

export const uploadPexel = (title, image, token) => {
    return dispatch => {
        dispatch(uploadPexelStart());
        const config = { 
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
            }   
        }

        const bodyFormData = new FormData();

        bodyFormData.append("data", JSON.stringify({ title }))
        bodyFormData.append("files.image", image)
         
        axios.post("/images", bodyFormData, config)
            .then((response) => {
                if(!response){
                    return dispatch(uploadPexelFail()); 
                }
                
                dispatch(uploadPexelEnd());
            })
    }; 
};