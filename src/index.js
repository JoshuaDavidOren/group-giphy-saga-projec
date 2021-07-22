import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import axios from 'axios';
import { response } from 'express';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';


// The watcher saga
const sagaMiddleware = createSagaMiddleware();
function* watcherSaga() {
    yield takeEvery('FETCH_GIF', getGiphys)
    yield takeEvery('ADD_FAVORITE', getFavorites);
    // yield takeEvery('')
}

// Saga's go here
function* getGiphys(search) {
    try {
        const giphyResponse = yield axios.get(`/api/favorite/${search}`);
        yield put({type: 'GET_GIF', payload: giphyResponse.data});
    }
    catch(error) {
        console.log('Error in getGiphys', error);
    }
}

function* postGiphys() {
    try {
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
        yield put({type: 'SET_FAVORITES', payload: response.data})
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
const searchReducer = (state = '', action) => {
    switch (action.type) {
        case "GET_GIF":
            console.log('Getting GIF', action.payload);
            // I commented out the code that was mutating the state.
            // For now, let's pass the database response out directly without doing any processing until we know it works.
            
            // let searchResults = [];
            // let results = action.payload.data;
            // for (let gif of results) {
            //     console.log(gif);
            //     searchResults.spread(...state, {url: gif.url, id: gif.id});
            // }
            return action.payload;
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

const store = createStore(
    combineReducers({
        searchReducer,
        favoriteReducer
    }),
    applyMiddleware(sagaMiddleware, logger),
  );
  
  sagaMiddleware.run(watcherSaga);



ReactDOM.render(<Provider>
    <App />
</Provider>, document.getElementById('root'));
