import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
const middleware = [thunk];
const initialState = {
    username: ''
}
function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_USERNAME':
            return {
                ...state,
                username: action.payload
            }
        default:
            return state
    }
}
function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState)
    } catch (e) {
        console.log(e)
    }
}
function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state')
        if (serializedState === null) return undefined
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e)
        return undefined
    }
}

const persistedState = loadFromLocalStorage()

const store = createStore(userReducer, persistedState, applyMiddleware(...middleware));

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store