import React, {Component} from 'react';

export class Others extends Component {
    render () {
        const {haveExport, urlExportExcel, nameExport} = this.props

        return <>
            <div className="others">
                <div className="others-left"></div>
                <div className="others-right">
                    {haveExport ? <div className="others-item"><a className="btn" href={urlExportExcel} download={nameExport + ".xlsx"}><span>Exporter Excel</span></a></div> : null}
                </div>
            </div>
        </>
    }
}