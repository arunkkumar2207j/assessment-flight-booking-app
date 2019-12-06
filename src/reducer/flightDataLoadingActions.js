function getFlightDetails() {
    return fetch('/data/flights.json')
        .then(handleErrors)
        .then(res => {
            return res.json();
        })
}

export function fetchFlightDetails() {
    return dispatch => {
        dispatch(fetchFlightDetailsBegin());
        return getFlightDetails()
            .then(json => {
                dispatch(fetchFlightDetailsSuccess(json));
                return json;
            })
            .catch(error => {
                dispatch(fetchFlightDetailsError(error));
            })
    }
}

export function fetchUpdatedFlightDetails(filter) {
    return dispatch => {
        dispatch(fetchFlightDetailsBegin());
        return getFlightDetails()
            .then(json => {
                console.log('filter-inside-Action: ', filter);
                console.log('fetched-json: ', json)
                let updatedJSON = json.filter((item, i) => {
                    if(item.source === filter.source ) {
                        return item;
                    }
                    // return item;
                })
                console.log('updatedJSON: ', updatedJSON);
                dispatch(fetchFlightDetailsSuccess(updatedJSON));
                // return updatedJSON;
            })
            .catch(error => {
                dispatch(fetchFlightDetailsError(error));
            })
    }
}

export function fetchFlightDetailsFor(source, destination, departure_date) {
    return null
}

function handleErrors(response) {
    if(!response.ok) {
        throw Error(response.statusText)
    }
    return response;
}

export const FETCH_FLIGHT_DETAILS_BEGIN = 'FETCH_FLIGHT_DETAILS_BEGIN';
export const FETCH_FLIGHT_DETAILS_SUCCESS = 'FETCH_FLIGHT_DETAILS_SUCCESS';
export const FETCH_FLIGHT_DETAILS_FAILURE = 'FETCH_FLIGHT_DETAILS_FAILURE';

export const fetchFlightDetailsBegin = () => ({
    type: FETCH_FLIGHT_DETAILS_BEGIN
});

export const fetchFlightDetailsSuccess = (payload) => ({
    type: FETCH_FLIGHT_DETAILS_SUCCESS,
    payload
})

export const fetchFlightDetailsError = (error) => ({
    type: FETCH_FLIGHT_DETAILS_FAILURE,
    payload: { error }
})