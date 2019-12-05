import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFlightDetails } from '../reducer/flightDataLoadingActions'
import '../css/SearchWidget.css';

class SearchWidget extends Component {
    constructor() {
        super()
        this.originCity = React.createRef();
        this.destinationCity = React.createRef();
        this.departureTime = React.createRef();
        this.passengers = React.createRef();
    }
    fetchData = () => {
        const filter = {
            originCity: this.originCity.current.value,
            destinationCity: this.destinationCity.current.value,
            departureTime: this.departureTime.current.value,
            passengers: this.passengers.current.value
        }
        console.log('filter: ', filter);
        this.props.fetchData()
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
        // console.log('distinctDepartureTime: ', distinctDepartureTime);
        // 
        let destTimeList = distinctDepartureTime.length > 0 
            && distinctDepartureTime.map((item, i) => {
                return <option key={i}>{item}</option>
            })
        return (
            <React.Fragment>
                <ul className="nav nav-tabs search-widget">
                    <li className="active tab">One Way</li>
                    <li className="dropdown">
                        <input type="text" ref={this.originCity} name="originCity" className="form-control form-control-sm" placeholder="Enter Origin City" />
                        <input type="text" ref={this.destinationCity} className="form-control form-control-sm" placeholder="Enter Destination City" />
                        <select ref={this.departureTime} className="form-control form-control-sm">
                            { destTimeList }
                        </select>
                        <select ref={this.passengers} className="form-control form-control-sm">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        <button className="btn btn-primary btn-sm" onClick={this.fetchData}>Search</button>
                    </li>
                </ul>
                
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
        fetchData: () => dispatch(fetchFlightDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchWidget);
