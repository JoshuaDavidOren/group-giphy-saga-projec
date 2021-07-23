const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// return all favorite images
// GET data from favorites table
router.get('/', (req, res) => {
    
    pool.query('SELECT * FROM "favorites";')
    .then((result) => {
      res.send(result.rows); 
    })
    .catch((err) => {
      console.log('Error GETing favorites data', err)
      res.sendStatus(500)
    })
  });

  module.exports = router;