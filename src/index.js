import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { put, takeEvery, call } from 'redux-saga/core/effects';
import createSagaMiddleware from 'redux-saga/core';
import logger from 'redux-logger';
import axios from 'axios';


// The watcher saga
const sagaMiddleware = createSagaMiddleware();
function* watcherSaga() {

}

// Saga's go here




//reducers go here
const searchReducer = (state = '', action) => {
    switch (action.type) {
        case "GET_GIF":
            console.log('Getting GIF', action.payload.data);
            let searchResults = [];
            let results = action.payload.data;
            for (let gif of results) {
                console.log(gif);
                searchResults.push({url: gif.url, id: gif.id});
            }
            return searchResults;
        default:
            return state;
    };
};

const favoriteReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            console.log(`Trying to add ${action.payload} to favorites`);
            state.push(action.payload);
            return state;

        case "REMOVE_FAVORITE":
            console.log(`Trying to remove ${action.payload} from favorites`);
            return state;

        default:
            return state;
    };
};


// Store instance

const store = createStore(
    combineReducers({
      
    }),
    applyMiddleware(sagaMiddleware, logger),
  );
  
  sagaMiddleware.run(watcherSaga);



ReactDOM.render(<Provider>
    <App />
</Provider>, document.getElementById('root'));
