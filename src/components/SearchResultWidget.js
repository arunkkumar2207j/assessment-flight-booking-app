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
        this.props.dispatch(fetchFlightDetails())
        this.setState({resultItems: this.props.items})
    }
    render() {
        const { loading, error, items, filters } = this.props;

        console.log('this.state.resultItems: ', this.state.resultItems)

        console.log('filters inside Result: ', filters);

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