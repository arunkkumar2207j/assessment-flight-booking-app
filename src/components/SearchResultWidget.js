import React from 'react'
import { connect } from 'react-redux'
import SearchResultList from './SearchResultList'
import { fetchFlightDetails } from '../reducer/flightDataLoadingActions'

class SearchResultWidget extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            resultItems: []
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchFlightDetails());
    }
    render() {
        const { loading, error, items, filters } = this.props;

        if(error) {
            return <div>Error! {error.message}</div>
        }

        if(loading) {
            return <div>Loading...</div>
        }
        
        if(items) {
            let updatedItems = items.filter((item) => {
                return item.source.includes(filters.source || '');
            }).filter((item) => {
                return item.destination.includes(filters.destination || '');
            }).filter((item) => {
                return item.departs_at.includes(filters.departs_at || '');
            }).filter((item) => {
                let ulteredFateString = 'Rs ' + filters.fare
                return item.fare.includes(ulteredFateString || '');
            })
            
            if(updatedItems.length) {
                return <SearchResultList data={updatedItems} filters={filters} />
            } else if(updatedItems.length === 0) {
                return <h3>Selected search flight details</h3>
            }
            
        }

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