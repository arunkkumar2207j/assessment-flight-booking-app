import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchResultItem from './SearchResultItem'

class SearchResultList extends Component {
    render() {
        const { items } = this.props;

        return (
            <React.Fragment>
                <h1 className="search-result-title">All Flights</h1>
                {
                    items.map((item, i) => {
                        return <SearchResultItem data={item} key={i} />
                    })
                }
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.flightDetailsReducer.items,
        loading: state.flightDetailsReducer.loading,
        error: state.flightDetailsReducer.error
    }
}

export default connect(mapStateToProps)(SearchResultList);