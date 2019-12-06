import React from 'react'
import { connect } from 'react-redux'
import SearchResultList from './SearchResultList'
import { fetchFlightDetails } from '../reducer/flightDataLoadingActions'

class SearchResultWidget extends React.PureComponent {
    componentDidMount() {
        this.props.dispatch(fetchFlightDetails())
    }
    render() {
        const { loading, error, items } = this.props;

        if(error) {
            return <div>Error! {error.message}</div>
        }

        if(loading) {
            return <div>Loading...</div>
        }
        
        return (
            <SearchResultList data={items} />
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

export default connect(mapStateToProps)(SearchResultWidget);