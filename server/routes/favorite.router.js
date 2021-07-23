const { default: axios } = require('axios');
const express = require('express');
const pool = require('../modules/pool');
require('dotenv').config();
const router = express.Router();


// GET Seach results from giphy
router.get('/:search', (req, res) => {
  const search = req.params.search;
  // console.log(`${process.env.SEARCH_GIPH_ENDPOINT}?api_key=${process.env.GIPH_API_KEY}&q=${search}&limit=50&offset=0&rating=pg-13&lang=en`); test function to make sure data is correct
  axios.get(`${process.env.SEARCH_GIPH_ENDPOINT}?api_key=${process.env.GIPH_API_KEY}&q=${search}&limit=50 &offset=0&rating=pg-13&lang=en`
  )
  .then((response) => {
    // console.log(response.data);
    res.send(response.data)
  })
  .catch((err) => {
    console.log('Error GETing giphs from GIPHY',err);
    res.sendStatus(500);
  });
});


// return all favorite images
// GET data from favorites table
router.get('/', (req, res) => {
  const qText = 'SELECT * FROM "favorites"';
  pool.query(qText)
  .then((result) => {res.send(result.rows); 
  })
  .catch((err) => {
    console.log('Error GETing favorites data', err)
    res.sendStatus(500)
  })
  res.sendStatus(200);
});

// add a new favorite
// POST gif to favorites table
router.post('/', (req, res) => {
  const newFavorite = req.body;
  const queryText = `
  INSERT INTO "favorites" ("url", "category_id")
  VALUES ($1, $2);
  `;
  const queryValues = [
    newFavorite.url,
    newFavorite.category_id
  ];
  pool.query(queryText, queryValues)
    .then(() => {
      console.log('INSERT to "favorites" successful');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing INSERT "favorites" query', err);
      res.sendStatus(500);
    });
});

// update given favorite with a category id
// PUT category ID into favorites table
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  const newFavorite = req.body;
  const favId = req.params.favId;
  const queryText = `
    UPDATE "favorites"
    SET "category_id" = $1
    WHERE "id" = $2;
  `;
  const queryValues = [
    newFavorite.category_id,
    favId
  ];
  pool.query(queryText, queryValues)
    .then(() => {
      console.log('UPDATE successful');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing UPDATE query', err);
      res.sendStatus(500);
    });
});

// delete a favorite
// delete from favorites table
router.delete('/:favId', (req, res) => {
  const favId = req.params.favId;
  const queryText = `
    DELETE FROM "favorites"
    WHERE "id" = $1;
  `;
  const queryValues = [
    favId
  ];
  pool.query(queryText, queryValues)
    .then(() => {
      console.log('DELETE successful');
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log('Error completing DELETE query', err);
      res.sendStatus(500);
    });
});

module.exports = router;
