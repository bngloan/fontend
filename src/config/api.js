import axios from "axios";
import configapi from './configapi'


export default axios.create({
    baseURL: `${configapi.API_SERVER}`,
    // baseURL: `${process.env.REACT_APP_NODE_HOST_URL}`,
    // baseURL:"https://nodejs-server-project.herokuapp.com/",
    headers: {
        "Content-type": "application/json",
        'Accept': 'application/json',
       
    },
});
