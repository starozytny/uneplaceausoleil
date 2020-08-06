const axios = require('axios/dist/axios');

function loader(status){
    let loader = document.querySelector('#loader');
    if(status){
        axios.interceptors.request.use(function (config) {
            loader.style.display = "flex"; return config;
        }, function (error) { return Promise.reject(error); });
    }else{
        loader.style.display = "none";
    }
}

module.exports = {
    loader
}