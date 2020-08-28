import * as actionTypes from './actionTypes';
import axios from '../../axios-pexel';
import { apiHostURL } from "../../config"

function mapImagesToPexel (images) {
    return images.map(image => {
        return{
            id: image.id,
            src: `${apiHostURL}${image.image ? image.image.url : "/uploads/default_image_943043ab9f.png"}`,
            title: image.title,
            uploader: image.user ? image.user.username : "a user"
        }
    })
} 

export const setImages = ( images ) => {
    return {
        type: actionTypes.SET_IMAGES,
        images
    };
};


export const searchImagesStart = () => {
    return {
        type: actionTypes.SEARCH_IMAGES_START
    };
};


export const initImages = () => {
    return dispatch => {
        axios.get("/images?_sort=id:DESC&_limit=50")
            .then((response) => {
                if(!response){
                    return
                }

                const images = mapImagesToPexel(response.data)

                dispatch(setImages(images));
            })
    }; 
};

export const searchImages = (queryText) => {
    return dispatch => {
        dispatch(searchImagesStart())

        axios.get(`/images?title_contains=` + queryText)
            .then((response) => {
                if(!response){
                    return
                }

                const images = mapImagesToPexel(response.data)

                dispatch(setImages(images));
            })
    }; 
};