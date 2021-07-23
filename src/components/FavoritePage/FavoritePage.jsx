import React from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";


function FavoritePage() {
    const history = useHistory();
    const favorites = useSelector(store => store.favoriteReducer);
    const gotoHomePage = () => {
        history.push('/');
    };

    return (
        <>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={gotoHomePage}>Home</Button>
        <Grid container spacing={3}>
        {favorites.map((favItem) => {
            return (
                <FavoriteItem key={favItem.id} url={favItem.url} title={favItem.title} category={favItem.category_id}/>
        );})}
        </Grid>
        </>
    );
};

export default FavoritePage;