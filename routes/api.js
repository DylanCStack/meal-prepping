const express = require('express');
const router = express.Router();

const IngredientsController = require('../controllers/ingredients.js');

/* GET users listing. */
router.get('/ingredients', function(req, res, next) {
  console.log("GET ingredients");
	IngredientsController.getAll(function(err, docs) {
    if (err) return res.json({
      error: err,
    });
    console.log(docs);
     res.json({
      ingredients: docs,
    });
  });
})

module.exports = router;