import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { useSelector } from "react-redux";

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const searchReducer = useSelector(store => store.searchReducer);

    const search = () => {
        console.log(`Searching for ${searchTerm} on GIPHY`);
        dispatch({
            type: 'GET_GIF',
            payload: searchTerm
        });
    };
      
    return (
        <>
        <TextField style={{ width: "400px" }} id="outlined-search" label="Search GIPHY" type="search" variant="outlined" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={search}>Search</Button>
        <Grid container spacing={3}>
        
        </Grid>
        </>
    );
};

export default SearchPage;