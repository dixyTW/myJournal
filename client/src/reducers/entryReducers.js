import {
    GET_ENTRIES,
    ENTRIES_LOADING,
    ADD_ENTRIES,
    DELETE_ENTRIES,
    NO_ENTRIES,
    UPDATE_FAVORITES
} from '../actions/types'

const initialState = {
    entries: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ENTRIES:
            return {
                ...state,
                entries: action.payload,
                loading: false
            };
        case ENTRIES_LOADING:
            return {
                ...state,
                loading: true
            }
        case ADD_ENTRIES:
            return {
                ...state,
                entries: [action.payload, ...state.entries]
            }
        case DELETE_ENTRIES:
            return {
                ...state,
                entries: state.entries.filter(entry => entry._id !== action.payload)
            }
        case NO_ENTRIES:
            return {
                ...state,
                entries: [],
                loading: false
            }
        case UPDATE_FAVORITES:
            return state
        default:
            return state;
    }
}