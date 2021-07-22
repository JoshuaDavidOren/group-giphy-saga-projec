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
const gifReducer = (state = '', action) => {
    switch (action.type === 'GET_GIF') {

    }
}



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
