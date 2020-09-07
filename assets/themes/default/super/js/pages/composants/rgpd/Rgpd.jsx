import React, {Component} from 'react';
import toastr from 'toastr';
import axios from 'axios/dist/axios';
import Routing from '../../../../../../../../public/bundles/fosjsrouting/js/router.min.js';
import ActionsArray from '../../../../../react/functions/actions_array';
import {Page} from '../../../components/composants/page/Page';
import Swal from 'sweetalert2';

export class RgpdList extends Component {
    constructor (props){
        super(props)

        this.state = {
            cardOpened: null
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleClick = (e) => {
        let id = e.currentTarget.dataset.id;
        let seen = e.currentTarget.dataset.seen;
        this.setState({ cardOpened: (id == this.state.cardOpened) ? null : id })

        if(seen == "false"){
            this.props.onUpdateSeen(id)
        }
    }

    handleDelete = (e) => {
        this.props.onDelete(e.currentTarget.dataset.id)
    }

    render () {
        const {demandes} = this.props
        const {cardOpened} = this.state

        let items = demandes.map(elem => {

            let bodyOpened = (cardOpened != null && cardOpened == elem.id) ? true : false;

            return <div className={"card1 card1-" + bodyOpened} key={elem.id}>
                <div className="card1-header">
                    <div className="card1-header-title">
                        <div className="title">{elem.firstname}</div>
                        <div className="subtitle">{elem.email}</div>
                        <div className="subject"> - {elem.subjectToStringShort}</div>
                    </div>
                    <div className="card1-header-toggle-body" data-id={elem.id} data-seen={elem.isSeen} onClick={this.handleClick} >
                        <div className="btn-icon">
                            <span className="icon-chevron-down"></span>
                        </div>
                    </div>
                </div>
                <div className="card1-body">
                    <p>{elem.message}</p>
                </div>
                <div className="card1-footer">
                    <div className="card1-footer-left">
                        <div className="btn-isSeen">
                                {elem.isSeen ? <span className="icon-vision"></span> : <span className="icon-vision-not"></span>}
                            </div>
                            <div className="date-discret">{elem.createAtString}</div>
                        </div>
                    <div className="card1-footer-right">
                        <div className="btn-icon" data-id={elem.id} onClick={this.handleDelete}>
                            <span className="icon-trash"></span>
                        </div>
                    </div>
                </div>
            </div>
        })

        return <> {items} </>
    }
}

export class Rgpd extends Component {
    constructor (props){
        super(props);

        let data = JSON.parse(JSON.parse(props.demandes));
        let dataList = data.slice(0, 12);

        this.state = {
            dataImmuable: data,
            data: data,
            dataList: dataList,
            tailleList: data.length,
        }

        this.handleUpdateList = this.handleUpdateList.bind(this);
        this.handleUpdateSeen = this.handleUpdateSeen.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleUpdateList = (dataList) => { this.setState({ dataList: dataList }) }

    handleUpdateSeen = (id) => {
        let self = this
        axios({ method: 'post', url: Routing.generate('super_rgpd_update_seen', {'rgpd': id}) }).then(function (response) {
            if(response.data.code === 1){
                self.setState({
                    data: ActionsArray.updateInArraySeen(self.state.dataList, id),
                    dataImmuable: ActionsArray.updateInArraySeen(self.state.dataImmuable, id)
                })
            }
        });
    }

    handleDelete = (id) => {
        Swal.fire({
            title: 'Etes-vous sûr ?',
            text: "La suppression est définitive.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, je confirme',
            cancelButtonText: 'Annuler'
          }).then((result) => {
            if (result.value) {

                let self = this
                axios({ method: 'post', url: Routing.generate('super_rgpd_delete', {'rgpd': id}) }).then(function (response) {
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

    render (){
        const {data, dataImmuable, dataList, tailleList} = this.state;

        let content = <div className="liste liste-rgpd">
            <RgpdList demandes={dataList} onDelete={this.handleDelete} onUpdateSeen={this.handleUpdateSeen} />
        </div>

        return <>
            <Page content={content} 
                havePagination="true" taille={tailleList} itemsPagination={data} perPage="12" onUpdate={this.handleUpdateList}
            />
        </>
    }
}