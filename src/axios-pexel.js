import axios from 'axios';
import { apiHostURL } from "./config"

const instance = axios.create({
    baseURL: apiHostURL
});

export default instance;