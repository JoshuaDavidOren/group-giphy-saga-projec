import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({root: {flexGrow: 1},paper: {padding: theme.spacing(2), textAlign: "center", color: theme.palette.text.secondary}})); // materialUI stuff

function SearchItem(item) {
    const [searchItem, setSearchItem] = useState([]);
    const dispatch = useDispatch();
    const classes = useStyles();

    // const addFavorite = (item) => {
    //     console.log('Adding to favorites', item);
    //     dispatch({
    //         type: 'ADD_FAVORITE',
    //         payload: item.url
    //     });
    // };

    return (
        <Grid item style={{height: "350px" }} id={item.id}> 
        <Card>
          <Paper className={classes.paper}>
          <CardMedia
          style = {{ height: 250}}
          component="img"
          alt="Contemplative Reptile"
          height="140"
          src={item.url}
          title="Contemplative Reptile"
        />
            <br />
            <Button
              style={{ width: "170px", height: "42px" }}
              variant="contained"
              color="primary"
              //onClick={}
            >
              Add to Favorites
            </Button>
          </Paper>
          </Card>
        </Grid>
    );
};

export default SearchItem;