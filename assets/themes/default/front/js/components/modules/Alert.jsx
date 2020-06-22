import React, {Components} from 'react';

function Alert({type, elem}){
    const className = 'alert-' + type;
    return (
        <> {elem ? <div className={className}>{elem}</div> : null} </>
    );
}

export function Success({success}) {
    return ( <> <Alert type="success" elem={success} /> </> );
}

export function Error({error}) {
    return ( <> <Alert type="error" elem={error} /> </> );
}