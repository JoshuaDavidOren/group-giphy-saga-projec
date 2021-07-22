import React, { useState } from 'react';
import { useSelector } from "react-redux";
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { put, takeEvery, call } from 'redux-saga/core/effects';
import createSagaMiddleware from 'redux-saga/core';
import logger from 'redux-logger';
import axios from 'axios';
import FavoriteItem from '../FavoriteItem/FavoriteItem';

function FavoritePage() {
    const [favoriteItem, setFavoriteItem] = useState([]);
    const favoriteReducer = useSelector(store => store.favoriteReducer);

    return (
        <>
        <Grid container spacing={3}>
        {favoriteReducer.map((data, index) => {
            return (
            <FavoriteItem key={index} item={data}/>
            )})}
        </Grid>
        </>
    );
};

export default FavoritePage;