import * as actionTypes from './actionTypes';
import axios from '../../axios-pexel';
import { apiHostURL } from "../../config"

function mapImagesToPexelObject (images) {
    return images.map(image => {
        return {
            id: image.id,
            src: `${apiHostURL}${image.image.url}`,
            title: image.title,
            uploadDate: new Date(image.image.createdAt).toDateString()
        }
    })
} 

export const deletePexelsStart = () => {
    return {
        type: actionTypes.DELETE_PEXELS_START
    }
}

export const setPexels = ( pexels ) => {
    return {
        type: actionTypes.SET_PEXELS,
        pexels
    };
};

export const fetchMyPexels = (token) => {
    return dispatch => {
        const config = { 
            headers: {
                'Authorization': 'Bearer ' + token 
            }   
        }
        axios.get("/images/my", config)
            .then((response) => {
                if(!response){
                    return
                }
                
                dispatch(setPexels(mapImagesToPexelObject(response.data)));
            })
    }; 
};


export const deletePexels = (pexels, token) => {
    return dispatch => {
        dispatch(deletePexelsStart())
        const config = { 
            headers: {
                'Authorization': 'Bearer ' + token 
            }   
        }

        axios.post("/images/delete/my", pexels, config)
        .then((response) => {
            if(!response) {
                return
            }

            dispatch(setPexels(mapImagesToPexelObject(response.data)));
        })
    }; 
};