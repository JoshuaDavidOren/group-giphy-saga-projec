import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function FavoritePage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const favorites = useSelector(store => store.showFavoritesReducer);
    const gotoHomePage = () => {
        history.push('/');
    };

    useEffect(() => {    
        getFavorites()  },
    []);

    const getFavorites = () => {
        dispatch({type: 'GET_FAVORITES'  });
    } //end getCategories
    console.log('before return:', favorites);
    return (
        <>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={gotoHomePage}>Home</Button>
        <Grid container spacing={3}>
        {favorites.map((favItem) => {
            return (
                <FavoriteItem key={favItem.id} url={favItem.url} category={favItem.category_id}/>
        );})}
        </Grid>
        </>
    );
};

export default FavoritePage;