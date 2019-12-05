import React, { Component } from 'react'
import '../css/SearchResultItem.css'

class SearchResultItem extends Component {
    render() {
        const {fare, flight_id, source_code, destination_code, departs_at, arrives_at} = this.props.data;
        const flight_route = (source_code +" > "+ destination_code).toUpperCase();

        return (
            <div className="row search-result-item">
                <div className="col-6 col-md-9">
                    <div className="flight-price">{fare}</div>
                    <div className="flight-name">{flight_id}</div>
                    <div className="flight-route">{flight_route}</div>
                    <div className="flight-departure-time">Depart: {departs_at}</div>
                    <div className="flight-arrival-time">Arrive: {arrives_at}</div>
                </div>
                <div className="col-12 col-md-3">
                        <div className="image-placeholder"></div>
                        <button href="#" className="btn btn-primary btn-sm">Book this Flight</button>
                </div>
            </div>
        )
    }
}

export default SearchResultItem;