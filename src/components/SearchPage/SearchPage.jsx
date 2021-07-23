import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SearchItem from '../SearchItem/SearchItem';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch();
    const searcher = useSelector(store => store.searchReducer);

    const search = () => {
        // console.log(`Searching for ${searchTerm} on GIPHY`); test function to make sure data is correct
        dispatch({
            type: 'FETCH_GIF',
            payload: searchTerm
        });
    };
 
    return (
        <>
        <TextField style={{ width: "400px" }} id="outlined-search" label="Search GIPHY" type="search" variant="outlined" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={search}>Search</Button>
        <Grid container spacing={3}>
        {searcher.map((testItem) => {
    return (
    <SearchItem key={testItem.id} url={testItem.url} />
    );})}
        </Grid>
        </>
    );
};

export default SearchPage;