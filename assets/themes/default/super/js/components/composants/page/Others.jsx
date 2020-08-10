import React, {Component} from 'react';

export class Others extends Component {
    render () {
        const {haveExport} = this.props

        return <>
            <div className="others">
                <div className="others-left"></div>
                <div className="others-right">
                    {haveExport ? <div className="others-item"><button className="btn"><span>Exporter Excel</span></button></div> : null}
                </div>
            </div>
        </>
    }
}