import React from 'react';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import SearchItem from '../SearchItem/SearchItem';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EditCategories from '../EditCategories/EditCategories';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


function SearchPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [editCategories, setEditCategories] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const searcher = useSelector(store => store.searchReducer);
    const gotoFavoritesPage = () => {
        dispatch({type: 'GET_FAVORITES'  })
        history.push('/favorites');
    };
   
    const paginationNext = () => {
        dispatch({
            type: 'FETCH_NEXTPAGE',
            payload: searchTerm
        })
    };
    const paginationLast = () => {
        dispatch({
            type: 'FETCH_LASTPAGE',
            payload: searchTerm
        })
    };


    const search = () => {
        // console.log(`Searching for ${searchTerm} on GIPHY`); test function to make sure data is correct
        dispatch({
            type: 'SEARCH',
            payload: searchTerm
        });
    };
 
    return (
        <>
        <TextField style={{ width: "400px" }} id="outlined-search" label="Search GIPHY" type="search" variant="outlined" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)}/>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={search}>Search</Button>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={gotoFavoritesPage}>Favorites</Button>
        <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={() => setEditCategories(!editCategories)}>Edit categories?</Button>
        {editCategories ? <EditCategories></EditCategories> : <></>}
        <Grid container spacing={2}>
        {searcher.map((testItem) => {
            return (
                <SearchItem key={testItem.id} url={testItem.url} title={testItem.title} />
        );})}
        </Grid>
        <BottomNavigation style={{width: '100%', position: 'fixed', bottom: 0}}>
            <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={paginationLast}>Previous Page</Button>
            <Button style={{ width: "150px", height: "55px" }} variant="contained" color="primary" onClick={paginationNext}>Next Page</Button>
        </BottomNavigation>
        </>
    );
};

export default SearchPage;