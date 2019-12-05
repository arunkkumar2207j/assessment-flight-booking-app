import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlightDetails } from '../reducer/flightDataLoadingActions'
import '../css/SearchPriceRangeWidget.css';

class SearchPriceRangeWidget extends Component {
    constructor() {
        super()
        this.priceRange = React.createRef();
    }
    fetchData = () => {
        const filter = {
            priceRange: this.priceRange.current.value
        }
        console.log(filter.priceRange);
        this.props.fetchData()
    }
    render() {
        return (
            <div className="search-price-range">
                <h1 className="block-title">Refine Flight Search</h1>
                <input ref={this.priceRange} type="range" step="500" min="6500" max="15000" onChange={this.fetchData} />
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: () => dispatch(fetchFlightDetails())
    }
}

export default connect(null, mapDispatchToProps)(SearchPriceRangeWidget);