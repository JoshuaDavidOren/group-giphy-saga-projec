import React from 'react';
import { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function FavoriteItem(favItem) {
    const [favoriteItem, setFavoriteItem] = useState([]);
    const classes = useStyles();
    const useStyles = makeStyles((theme) => ({root: {flexGrow: 1},paper: {padding: theme.spacing(2), textAlign: "center", color: theme.palette.text.secondary}})); // materialUI stuff

    const removeFavorite = (item) => {
        console.log('Adding to favorites', item);
        dispatch({
            type: 'REMOVE_FAVORITE',
            payload: item
        });
    };

    return (
      <Grid item style={{height: "550px" }} id={favItem.id}> 
        <Paper className={classes.paper}>
        <CardMedia
        style={{height: "550px" }}
        className={favItem.title}
        component="img"
        alt={favItem.title}
        src={favItem.url}
        title={favItem.title}
      />
          <br />
          <Button
            style={{ width: "180px", height: "42px" }}
            variant="contained"
            color="primary"
            onClick={() => removeFavorite(item)}
          >
            Remove From Favorites
          </Button>
        </Paper>
      </Grid>
    );
};

export default FavoriteItem;