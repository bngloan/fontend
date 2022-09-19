import axios from "axios";
import configapi from './configapi'

export default axios.create({
    withCredentials: true,
    baseURL: `${configapi.API_SERVER}`,
   
    headers: { Accept: 'application/json', "Content-Type": "multipart/form-data" },
});