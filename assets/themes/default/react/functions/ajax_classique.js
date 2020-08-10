const axios = require('axios/dist/axios');
const Loader = require('./loader');

function sendAjax(self, url, data, suite) {
    Loader.loader(true);

    axios({ method: 'post', url: url, data: data }).then(function (response) 
    {
        let data = response.data;
        let code = data.code;
        Loader.loader(false);
        
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