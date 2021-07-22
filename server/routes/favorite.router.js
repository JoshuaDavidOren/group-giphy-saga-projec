const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();

// return all favorite images
// GET data from favorites table
router.get('/', (req, res) => {
  res.sendStatus(200);
});

// add a new favorite
// POST gif to favorites table
router.post('/', (req, res) => {
  res.sendStatus(200);
});

// update given favorite with a category id
// PUT category ID into favorites table
router.put('/:favId', (req, res) => {
  // req.body should contain a category_id to add to this favorite image
  res.sendStatus(200);
});

// delete a favorite
// delete from favorites table
router.delete('/', (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
