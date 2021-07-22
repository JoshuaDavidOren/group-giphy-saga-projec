import React from 'react';
import { useState } from 'react';
import SearchItem from '../SearchItem/SearchItem';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

function SearchItem(item) {
    const [searchItem, setSearchItem] = useState([]);
    const classes = useStyles();
    const useStyles = makeStyles((theme) => ({root: {flexGrow: 1},paper: {padding: theme.spacing(2), textAlign: "center", color: theme.palette.text.secondary}})); // materialUI stuff

    const addFavorite = (item) => {
        console.log('Adding to favorites', item);
        dispatch({
            type: 'ADD_FAVORITE',
            payload: item
        });
    };

    return (
        <Grid item style={{ maxWidth: "800px", height: "400px" }} id={item.id}>  
          <Paper className={classes.paper}>
            <img src={item.url} />
            <br />
            <Button
              style={{ width: "170px", height: "42px" }}
              variant="contained"
              color="primary"
              onClick={addFavorite(item)}
            >
              Add to Favorites
            </Button>
          </Paper>
        </Grid>
    );
};

export default SearchItem;