import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { accountReducer, sessionReducer } from '../reducers'

var store
export default {

	configureStore: (initialState) => {
		// Combine Reducers
		var reducers = combineReducers({
			account: accountReducer,
			session: sessionReducer
		})

		store = createStore(
		    reducers,
		    initialState,
		    applyMiddleware(thunk) // Add middleware to createStore
		)

		return store
	},

	currentStore: () => {
		return store
	}

}







