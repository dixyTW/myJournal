import {
    GET_ENTRIES,
    ENTRIES_LOADING,
    ADD_ENTRIES,
    DELETE_ENTRIES,
    NO_ENTRIES,
    UPDATE_FAVORITES,
    SORT_ASCENDING,
    SORT_DESCENDING
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
            for (var i = 0; i < state.entries.length; i++) {
                if (state.entries[i]._id === action.payload) {
                    state.entries[i].favorite ^= 1
                    break;
                }
            }
            return {
                ...state,
                entries: state.entries
            }
        case SORT_ASCENDING:
                state.entries.sort(function(a,b){
                    return new Date(a.date) - new Date(b.date);
                })
                return {
                    ...state,
                    entries: state.entries
                }
            
        case SORT_DESCENDING:
                state.entries.sort(function(a,b){
                    return new Date(b.date) - new Date(a.date);
                })
                return {
                    ...state,
                    entries: state.entries
                }
        default:
            return state;
    }
}