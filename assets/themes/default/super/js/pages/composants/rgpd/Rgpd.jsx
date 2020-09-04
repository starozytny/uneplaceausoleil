import React, {Component} from 'react';
import toastr from 'toastr';
import axios from 'axios/dist/axios';
import Routing from '../../../../../../../../public/bundles/fosjsrouting/js/router.min.js';
import Loader from '../../../../../react/functions/loader';
import Validateur from '../../../../../react/functions/validateur';
import {Page} from '../../../components/composants/page/Page';
import {Aside} from '../../../components/composants/page/Aside';
import {Input, Checkbox} from '../../../../../react/composants/Fields';
import {Alert} from '../../../../../react/composants/Alert';
import {Drop} from '../../../../../react/composants/Drop';
import Swal from 'sweetalert2';

export class RgpdList extends Component {
    constructor (props){
        super(props)

        this.state = {
            demandes: this.props.demandes,
            cardOpened: null
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick = (e) => {
        let id = e.currentTarget.dataset.id;
        let seen = e.currentTarget.dataset.seen;
        this.setState({ cardOpened: (id == this.state.cardOpened) ? null : id })

        if(seen == "false"){
            let self = this
            const {demandes} = this.state
            axios({ method: 'post', url: Routing.generate('super_rgpd_update_seen', {'rgpd': id}) }).then(function (response) {
                let data = response.data; let code = data.code;
                if(code === 1){
                    let arr = [];
                    demandes.forEach((elem) => {
                        if(elem.id == id){ elem.isSeen = true }
                        arr.push(elem)
                    })

                    self.setState({demandes: arr})
                }
            });
        }
    }

    render () {
        const {demandes, cardOpened} = this.state

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
                        <div className="btn-icon">
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
    }
    render (){
        const {data, dataImmuable, dataList, tailleList} = this.state;

        let content = <div className="liste liste-rgpd">
            <RgpdList demandes={dataList} />
        </div>

        return <>
            <Page content={content} 
                  havePagination="true" taille={tailleList} itemsPagination={data} perPage="12"
                  />
        </>
    }
}