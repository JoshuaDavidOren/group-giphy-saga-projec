import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { put, takeEvery, call } from 'redux-saga/core/effects';
import createSagaMiddleware from 'redux-saga/core';
import logger from 'redux-logger';
import axios from 'axios';
import SearchItem from '../SearchItem/SearchItem';

function SearchPage() {

    return (

    );
};

export default SearchPage;