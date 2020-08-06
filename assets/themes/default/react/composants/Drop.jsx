import React, { Component } from 'react';
import toastr from 'toastr';
import Dropzone from 'react-dropzone-uploader';
import Routing from '../../../../../public/bundles/fosjsrouting/js/router.min.js';

export class Drop extends Component {
    constructor (props) {
        super(props)

        this.handleChangeStatus = this.handleChangeStatus.bind(this)
        this.getUploadParams = this.getUploadParams.bind(this)
    }

    getUploadParams = () => {
        return { url: 'https://httpbin.org/post' }
    }

    handleChangeStatus = ({meta, remove}, status) => {
        if (status === 'headers_received') {
            toastr.info(`${meta.name} téléchargé!`)
            remove()
          } else if (status === 'aborted') {
            toastr.error(`${meta.name}, n'a pas pu être téléchargé..`)
          }
    }

    render () {

        return <>
            <Dropzone
                getUploadParams={this.getUploadParams}
                onChangeStatus={this.handleChangeStatus}
                maxFiles={1}
                multiple={false}
                canCancel={false}
                inputContent={this.props.label}
                styles={{
                dropzone: { width: 400, height: 200 },
                dropzoneActive: { borderColor: 'green' },
                }}
            />
        </>
    }
}
