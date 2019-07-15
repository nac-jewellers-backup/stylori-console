import axios from 'axios';

const request = (...params) => axios({
        url : params[0],
        method:params[1],
        data :params[2] ? params[2] : null ,
        headers:params[3] ? params[3] : null
    });

export default request;