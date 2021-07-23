import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";


//material-ui functions
const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));


function EditCategories(item) {
    const categoryList = useSelector(storeInstance => storeInstance.categoryReducer) || [];

    //more material-ui stuff
    const classes = useStyles();
    const [age, setAge] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [open, setOpen] = useState(false);
  
    const handleChange = (event) => {
        setNewCategory(event.target.value);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleOpen = () => {
      setOpen(true);
    };
    
    const dispatch = useDispatch();

    useEffect(() => {
        getCategories();
    }, []);

    const addCategory = () => {
        console.log('categoryList', categoryList);
    }

    const getCategories = () => {
        dispatch({type: 'GET_CATEGORIES'});
        console.log('in getCategories of EditCategories:', categoryList);
    } //end getCategories

    const postCategory = () => {
        dispatch({type: 'POST_CATEGORY'});
        console.log('in postCategory of EditCategories:', categoryList);
    } //end postCategory

    const putCategory = () => {
        dispatch({type: 'PUT_CATEGORY'});
        console.log('in putCategory of EditCategories:', categoryList);
    } //end putCategory

    const deleteCategory = () => {
        dispatch({type: 'DELETE_CATEGORY'});
        console.log('in deleteCategory of EditCategories:', categoryList);
    } //end deleteCategory
    console.log("before return",categoryList);
    return (
        <div>
            <TextField style={{ width: "400px" }} label="new category" variant="outlined" value={newCategory} onChange={(event) => setNewCategory(event.target.value)}/>
            <Button className={classes.button} onClick={handleOpen}>
                Open the select
            </Button>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-controlled-open-select-label">Category</InputLabel>
                <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={newCategory}
                onChange={handleChange}
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {categoryList.map((category) => {
                    return (<MenuItem key={category.id} value={category.name}>{category.name}</MenuItem>)
                })}
                </Select>
            </FormControl>
            <Button
              style={{ width: "180px", height: "42px" }}
              variant="contained"
              color="primary"
              onClick={() => addCategory(item)}
            >
              Add Category
            </Button>
        </div>
    );
};

export default EditCategories;