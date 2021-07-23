import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
require('dotenv').config();
// import { response } from 'express';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';


// The watcher saga
const sagaMiddleware = createSagaMiddleware();
function* watcherSaga() {
    yield takeEvery('FETCH_GIF', getGiphys); // searches giphy for gif input from searchpage
    //yield takeEvery('POST_GIFS', postGiphys); // now posting retrieved gifs to searchReducer to show up on DOM
    // yield takeEvery('ADD_FAVORITE', getFavorites);
    // yield takeEvery('')
}

// Saga's go here
function* getGiphys(searchQuery) {
    console.log('in getGiphys', searchQuery.payload);
    try {
        const giphyResponse = yield axios.get(`/api/favorite/${searchQuery.payload}`);
        console.log('getGiphys has payload:', giphyResponse.data.data, 'now attempting to post');
        yield put({type: 'POST_GIFS', payload: giphyResponse.data.data});
    }
    catch(error) {
        console.log('Error in getGiphys', error);
    }
}

function* postGiphys(action) {
    try {
        console.log('attempting to post', action.payload)
        yield call(axios.post('/', action.payload));
        yield put({type: 'FETCH_GIF'});
    }
    catch(error) {
        console.log('Error trying to post', error);
    }
}

// saga for when favorite is picked
function* gifFavorite(action) {
    try {
        yield call(axios.post, '/', action.payload);
        yield put({type: 'ADD_FAVORITE'});
    }
    catch(error) {
        console.log('Error trying to pick favorite', error);
    }
}

//GETs favorite database and sets favorites
function* getFavorites() {
    try {
        const favResponse = yield axios.get('/')
        // Need to add spot for SET_FAVORITES to be called
        yield put({type: 'SET_FAVORITES', payload: favResponse.data})
    }
    catch (error) {
        console.log('Error getting favorites', error);
    }
}

//saga for the category
function* gifCategory() {
    try {
        yield call(axios.post, '/', action.payload);
        yield put({type: 'ADD_CATEGORY'});
    }
    catch(error) {
        console.log('Error putting into category', error);
    }
}
//Put saga for the updating of category on gif list


//reducers go here
const searchReducer = (state = [], action) => {
    switch (action.type) {
        case "POST_GIFS":
            console.log('Getting GIF', action.payload);
            let returnArray = [];
            let results = action.payload;
            for (let x = 0; x < results.length; x++) {
                console.log(results[x].url);
                returnArray.push({id: results[x].id, url: results[x].images.fixed_height.url});
                //results[x].images.fixed_height_still.url
                console.log(returnArray);
            }
            return returnArray
        default:
            return state;
    };
};

const favoriteReducer = (state = [], action) => {
    switch (action.type) {
        case "ADD_FAVORITE":
            console.log(`Trying to add ${action.payload} to favorites`);
            return [...state, action.payload];

        case "REMOVE_FAVORITE":
            console.log(`Trying to remove ${action.payload} from favorites`);
            return state;

        default:
            return state;
    };
};


// Store instance

const storeInstance = createStore(
    combineReducers({
        searchReducer,
        favoriteReducer
    }),
    applyMiddleware(sagaMiddleware, logger),
  );
  
  sagaMiddleware.run(watcherSaga);



ReactDOM.render(<Provider store={storeInstance}>
    <App />
</Provider>, document.getElementById('root'));
