import React from 'react'
import '../css/SearchResultItem.css'

const SearchResultItem = (props) => {
    const flightRoute = (source_code, destination_code) => {
       return (source_code +" > "+ destination_code).toUpperCase()
    }
    function addCommas(nStr)
    {
        nStr += '';
        let x = nStr.split('.');
        let x1 = x[0];
        let x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return (x1 + x2);
    }
    const convertFare = (fare) => {
        let str = fare;
        let convertedFare = addCommas(str.substring(3))
        return "Rs. "+convertedFare + '.00';
    }
    return (
        <div className="row search-result-item">
            <div className="col-6 col-md-9">
                <div className="flight-price">{convertFare(props.data.fare)}</div>
                <div className="flight-name">{props.data.flight_id}</div>
                <div className="flight-route">{flightRoute(props.data.source_code, props.data.destination_code)}</div>
                <div className="flight-departure-time">Depart: {props.data.departs_at}</div>
                <div className="flight-arrival-time">Arrive: {props.data.arrives_at}</div>
            </div>
            <div className="col-12 col-md-3">
                    <div className="image-placeholder"></div>
                    <button href="#" className="btn btn-primary btn-sm">Book this Flight</button>
            </div>
        </div>
    )
}
export default SearchResultItem;