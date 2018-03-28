const express = require('express');
const router = express.Router();

const IngredientsController = require('../controllers/ingredients.js');

router.get('/', function(req, res, next) {
	IngredientsController.getAll(function(err, ingredients) {
    if (err) return res.json({
      error: err,
    });
    res.json({
      ingredients,
    });
  });
});

router.post('/add', function(req, res, next) {
  IngredientsController.create(req.body, function(err, response) {
    if (err) return res.json({
      error: err,
    });
    
    res.json({
      error: err,
      response,
    });
  });
})

module.exports = router;