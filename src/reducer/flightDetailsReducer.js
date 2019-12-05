import { 
    FETCH_FLIGHT_DETAILS_BEGIN, 
    FETCH_FLIGHT_DETAILS_SUCCESS, 
    FETCH_FLIGHT_DETAILS_FAILURE
} from './flightDataLoadingActions';

const initialState = {
    items: [],
    loading: false,
    error: null
}
export default function flightDetailsReducer(
    state = initialState,
    action
) {
    switch(action.type) {
        case FETCH_FLIGHT_DETAILS_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_FLIGHT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            }
        case FETCH_FLIGHT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: []
            }
        default:
            return state;
    }
}