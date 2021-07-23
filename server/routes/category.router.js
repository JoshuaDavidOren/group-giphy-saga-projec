const express = require('express');
const pool = require('../modules/pool');

const router = express.Router();
router.get('/', (req, res) => {
  // return all categories
  const queryText = `SELECT * FROM category ORDER BY name ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in category.router GET on query ${error}`);
      res.sendStatus(500);
    });
});

//add new category
router.post('/', (req, res) => {
  //new category data
  const newCategoryData = req.body;

  //query
  const queryText = `
  INSERT INTO "category" ("name")
  VALUES ($1);
  `;
  
  //array of values to be inserted (to avoid SQL injection)
  const queryValues = [
    newCategoryData.name
  ];
  
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in category.router POST on query ${error}`);
      res.sendStatus(500);
    });
});

//update existing category
router.put('/:catId', (req, res) => {
  //new category name
  const newCategory = req.body;

  //id of existing category to be updated
  const catId = req.params.catId;
  //query
  const queryText = `
    UPDATE "category"
    SET "name" = $1
    WHERE "id" = $2;
  `;

  //array of input values (to avoid SQL injection)
  const queryValues = [
    newCategory.name,
    catId
  ];
  pool
    .query(queryText, queryValues)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in category.router PUT on query ${error}`);
      res.sendStatus(500);
    });
});

//delete a category
router.delete('/:catId', (req, res) => {
  //id of category to be deleted
  const catId = req.params.catId;
  //query
  const queryText = `
  DELETE FROM "category"
  WHERE "id" = $1;
  `;

  pool
    .query(queryText, [catId])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error in category.router DELETE on query ${error}`);
      res.sendStatus(500);
    });
});

module.exports = router;
