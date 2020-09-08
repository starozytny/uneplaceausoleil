const Swal = require('sweetalert2');
const toastr = require('toastr');
const axios = require('axios/dist/axios');
const ActionsArray = require('./actions_array');

function classiqueUpdateSeen(self, url, id){
    axios({ method: 'post', url: url }).then(function (response) {
        if(response.data.code === 1){
            self.setState({
                data: ActionsArray.updateInArraySeen(self.state.dataList, id),
                dataImmuable: ActionsArray.updateInArraySeen(self.state.dataImmuable, id)
            })
        }
    });
}

function classiqueDelete(self, url, id){
    Swal.fire({
        title: 'Etes-vous sûr ?',
        text: "La suppression est définitive.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, je confirme',
        cancelButtonText: 'Annuler'
    }).then((result) => {
        if (result.value) {
            axios({ method: 'post', url: url }).then(function (response) {
                let data = response.data; let code = data.code;

                if(code === 1){
                    let d = self.state.dataImmuable.filter(v => v.id == id)
                    self.setState({
                        dataList: ActionsArray.deleteInArray(self.state.dataList, d[0]), 
                        data: ActionsArray.deleteInArray(self.state.data, d[0]),
                        dataImmuable: ActionsArray.deleteInArray(self.state.dataImmuable, d[0]),
                        tailleList: parseInt(self.state.tailleList) - 1,
                    })
                    toastr.info('Suppression réussie.')
                }else{
                    toastr.error(data.message)
                }
            });
        }
    })
}

module.exports = {
    classiqueDelete,
    classiqueUpdateSeen
}