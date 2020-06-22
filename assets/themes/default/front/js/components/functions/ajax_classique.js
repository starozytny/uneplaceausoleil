const axios = require('axios/dist/axios');

function sendAjax(self, url, data) {
    axios({ method: 'post', url: url, data: data }).then(function (response) 
    {
        let data = response.data;
        let code = data.code;
        
        if(code === 1){
            self.setState({ 
                error: '',
                success: data.message,
                email : {value: ''}
            });
        }else{
            self.setState(data.errors);
        }
    });
}

module.exports = {
    sendAjax
}