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
    const [categoryId, setCategoryId] = useState('');
    const [open, setOpen] = useState(false);
  
    const handleChange = (event) => {
        let categoryObject = event.target.value;
        setNewCategory(categoryObject.name);
        setCategoryId(categoryObject.id);
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
        postCategory(newCategory);
    } //end addCategory

    const handleDelete = () => {
        deleteCategory(categoryId);
    } //end addCategory

    const updateCategory = () => {
        console.log('categoryList', categoryList);
        putCategory(categoryId, newCategory);
    } //end updateCategory

    const getCategories = () => {
        dispatch({type: 'GET_CATEGORIES'});
        console.log('in getCategories:');
    } //end getCategories

    const postCategory = (catName) => {
        dispatch({type: 'POST_CATEGORY', payload: {name: catName}});
        console.log('in postCategory:', catName);
    } //end postCategory

    const putCategory = (catId, catName) => {
        dispatch({type: 'PUT_CATEGORY', payload: {id: catId, name: catName}});
        console.log('in putCategory:', catId, catName);
    } //end putCategory

    const deleteCategory = (catId) => {
        dispatch({type: 'DELETE_CATEGORY', payload: {id: catId}});
        console.log('in deleteCategory:', catId);
    } //end deleteCategory

    return (
        <div>
            <TextField style={{ width: "400px" }} label="new category" variant="outlined" value={newCategory} onChange={(event) => setNewCategory(event.target.value)}/>
            <Button
              style={{ width: "180px", height: "42px" }}
              variant="contained"
              color="primary"
              onClick={() => addCategory(item)}
            >
              Add Category
            </Button>
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
                {categoryList.map((category) => {
                    return (<MenuItem key={category.id} value={{name: category.name, id: category.id}}>{category.name}</MenuItem>)
                })}
                </Select>
            </FormControl>
            <Button
              style={{ width: "180px", height: "42px" }}
              variant="contained"
              color="primary"
              onClick={() => updateCategory(item)}
            >
              Update Category
            </Button>
            <Button
              style={{ width: "180px", height: "42px" }}
              variant="contained"
              color="primary"
              onClick={() => handleDelete(item)}
            >
              Delete Category
            </Button>
        </div>
    );
};

export default EditCategories;