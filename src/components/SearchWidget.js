import React from 'react';
import { connect } from 'react-redux';
import { fetchFlightDetails } from '../reducer/flightDataLoadingActions'
import '../css/SearchWidget.css';

class SearchWidget extends React.PureComponent {
    constructor() {
        super()
        this.source = React.createRef();
        this.destination = React.createRef();
        this.departs_at = React.createRef();
        this.passengers = React.createRef();
        this.fare = React.createRef();
        this.state = {
            price: "6500"
        }
    }
    setFilters = () => {
        const filter = {
            source: this.source.current.value,
            destination: this.destination.current.value,
            departs_at: this.departs_at.current.value,
            passengers: this.passengers.current.value,
            fare: this.fare.current.value !== undefined ? this.fare.current.value : 6500
        }
        this.props.filters(filter);
        this.setState(() => {
            return {price: this.fare.current.value}
        })

    }
    distinct = (value, index, self) => {
        return self.indexOf(value) === index;
    }
    render() {
        const { items } = this.props;
        const distinctDepartureTimeList = items.map((item, i) => {
            return item.departs_at;
        })
        const distinctDepartureTime = distinctDepartureTimeList.filter(this.distinct);
        
        let sortedDestTimeList = distinctDepartureTime.length > 0 
            && distinctDepartureTime.map((item, i) => {
                return item
            }).sort(function (a, b) {
                return new Date('1970/01/01 ' + a) - new Date('1970/01/01 ' + b);
              });

        console.log("destTimeList1: ", new Array(sortedDestTimeList));
      
        let destTimeList = distinctDepartureTime.length > 0 
            && distinctDepartureTime.map((item, i) => {
                return <option key={i}>{item}</option>
            })
        return (
            <React.Fragment>
                <ul className="nav nav-tabs search-widget">
                    <li className="active tab">One Way</li>
                    <li className="dropdown">
                        <input type="text" ref={this.source} name="originCity" className="form-control form-control-sm" placeholder="Enter Origin City" />
                        <input type="text" ref={this.destination} className="form-control form-control-sm" placeholder="Enter Destination City" />
                        <select ref={this.departs_at} className="form-control form-control-sm">
                            { destTimeList }
                        </select>
                        <select ref={this.passengers} className="form-control form-control-sm">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <button className="btn btn-primary btn-sm" onClick={this.setFilters}>Search</button>
                    </li>
                </ul>

                <div className="search-price-range">
                    <h1 className="block-title">Refine Flight Search</h1>
        <p>Price: Rs. {this.state.price}</p>
                    <input ref={this.fare} type="range" step="500" min="6500" max="15000" onChange={this.setFilters} />
                </div>
                
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        items: state.flightDetailsReducer.items
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUpdatedData: () => dispatch(fetchFlightDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidget);
