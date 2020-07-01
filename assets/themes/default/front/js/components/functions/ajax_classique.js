const axios = require('axios/dist/axios');

function sendAjax(self, url, data, suite) {
    let loader = document.querySelector('#loader');

    axios.interceptors.request.use(function (config) {
        loader.style.display = "flex"; return config;
    }, function (error) { return Promise.reject(error); });

    axios({ method: 'post', url: url, data: data }).then(function (response) 
    {
        let data = response.data;
        let code = data.code;
        loader.style.display = "none";
        
        if(code === 1){
            let state = { error: '', success: data.message }
            let newState = {...state, ...suite}
            self.setState(newState);
            if(data.url !== undefined){
                window.history.replaceState(null, null, data.url);
                setTimeout(function () {
                    location.reload()
                }, 3000);
            }
        }else{
            self.setState(data.errors);
        }
    });
}

module.exports = {
    sendAjax
}