import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { put, takeEvery, call } from 'redux-saga/core/effects';
import createSagaMiddleware from 'redux-saga/core';
import logger from 'redux-logger';
import axios from 'axios';
import SearchPage from './SearchPage/SearchPage';

function App(props) {
  return (
    <div>
      <h1>Giphy Search!</h1>
      <SearchPage />
    </div>
  );
}

export default App;
