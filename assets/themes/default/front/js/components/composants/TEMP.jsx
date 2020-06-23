export class BulleCookies extends Component{
    constructor(props) {
        super(props);

        this.varConsent = 'hasConsentLocal';
        this.state = {
            banner: false,
            accepter: false,
            refuser: false
        }

        this.handleClickAccept = this.handleClickAccept.bind(this);
        this.handleClickRefuse = this.handleClickRefuse.bind(this);
    }

    componentDidMount () {        
        

    }

    handleClickAccept (e){
        startGoogleAnalytics();
        Cookies.set(this.varConsent, true, { expires: 395 });
        this.setState({banner: false, accepter: true, refuser: false});
    }

    handleClickRefuse (e){
        reject();
        Cookies.set(this.varConsent, false, { expires: 395 });
        this.setState({banner: false, accepter: false, refuser: true});
    }


    render () {
        const {url} = this.props;
        const {accepter, refuser, banner} = this.state;
        let className = banner ? 'param-cookies active' : 'param-cookies';

        return (
            <div className={className}>
                <p>
                    En poursuivant votre navigation sur ce site,  vous nous autorisez à déposer des cookies à des 
                    fins de mesure d'audience et réaliser des statistiques de visites. Vos données de navigations 
                    sur ce site sont envoyées à Google Inc. <br/>
                    Une fois votre réponse validée, un cookie sera déposé afin de mémoriser votre choix. <br/>
                    <a href={url}>En savoir plus sur notre politique de confidentialité</a>
                </p>
                <AnalyticsCookies activeAccepter={accepter} activeRefuser={refuser} onClickAccept={this.handleClickAccept} onClickRefuse={this.handleClickRefuse} />
            </div>
        );
    }
}