function validateText($value) {
    if($value === ""){
        return {
            'code': false,
            'message': 'Ce champ doit être renseigné.'
        };
    }
    return {'code': true};
}

function validateEmail($value){
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test($value)){
        return {'code': true};
    }
    return {
        'code': false,
        'message': 'Cette adresse e-mail est invalide.'
    };
}

function validateur(values){
    let validate; let code = true;
    let errors = {};
    values.forEach(element => {
        switch (element.type) {
            case 'text':
                validate = validateText(element.value);
                break;
            case 'email':
                validate = validateEmail(element.value);
                break;
        }
        if(!validate.code){
            errors[element.id] = {
                value: element.value,
                error: validate.message
            };
            code = false;
        }
    });

    return {
        'code': code,
        'errors': errors
    };
}

module.exports = {
    validateur
}