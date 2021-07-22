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
    yield takeEvery('FETCH_GIPHY', getGiphys)

}

// Saga's go here
function* getGiphys() {
    try {
        const giphyResponse = yield axios.get('/api');
        yield put({type: 'GET_GIF', payload: giphyResponse.data});
    }
    catch(error) {
        console.log('Error in getGiphys', error);
    }
}

function* postGiphys() {
    try {
        yield call(axios.post('/', action.payload));
        yield put({type: 'FETCH_GIF'};)
    }
    catch(error) {
        console.log('Error trying to post', error);
    }
}

// GET saga for favorites

//GET saga for the category

//Put saga for the updating of category on gif list

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
