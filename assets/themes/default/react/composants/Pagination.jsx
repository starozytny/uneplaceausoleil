import React, {Component} from 'react';
import ReactPaginate from 'react-paginate';

export class Pagination extends Component {
    constructor (props) {
        super(props)

        let perPage = props.perPage != undefined ? props.perPage : 20;
        this.state = {
            offset: 0,
            currentPage: 0,
            pageCount: Math.ceil(props.taille/ perPage),
        }

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick = (e) => {
        console.log(e)
        const selectedPage = e.selected;
        const offset = selectedPage * this.props.perPage;

        this.setState({ currentPage: selectedPage, offset: offset })
        this.props.onUpdate(this.props.items.slice(offset, offset + parseInt(this.props.perPage)))
    }

    render () {
        const {pageCount} = this.state

        return <>
            <ReactPaginate
                previousLabel={<span className="icon-left-arrow"></span>}
                nextLabel={<span className="icon-right-arrow"></span>}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={pageCount}
                marginPagesDisplayed={1}
                pageRangeDisplayed={3}
                onPageChange={this.handleClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </>
    }
}