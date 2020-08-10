import React, { Component } from 'react';
import toastr from 'toastr';
import Loader from '../functions/loader';
import Dropzone from 'react-dropzone-uploader';

export class Drop extends Component {
    constructor (props) {
        super(props)

        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.getUploadParams = this.getUploadParams.bind(this)
    }

    getUploadParams = (e) => {
        Loader.loaderWithoutAjax(true)
        this.props.onGetFile(e)
        return { url: 'https://httpbin.org/post' }
    }

    handleChangeStatus = ({meta, remove}, status) => {
        
        if (status === 'headers_received') {
            toastr.info(`${meta.name} téléchargé !`)
            // remove()
            Loader.loaderWithoutAjax(false)
        } else if (status === 'aborted') {
            toastr.error(`${meta.name}, n'a pas pu être téléchargé..`)
            Loader.loaderWithoutAjax(false)
        }
    }

    handleSubmit = (files, allFiles) => {
        allFiles.forEach(f => f.remove())
    }

    render () {

        return <>
            <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                accept="image/*"
                maxFiles={1}
                multiple={false}
                canCancel={false}
                inputContent={(files, extra) => (extra.reject ? 'Seul les images sont acceptées.' : this.props.label)}
                styles={{
                    dropzone: { width: 400, height: 200 },
                    dropzoneActive: { borderColor: 'green' },
                }}
            />
        </>
    }
}