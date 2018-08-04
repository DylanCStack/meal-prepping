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

router.post('/delete', function (req, res, next) {
  IngredientsController.delete(req.body.id, function(err, response) {
    if (err) return res.json({
      error: err,
    });

    res.json({
      error: err,
      id: req.body.id,
      response,
    });
  });
})

router.get('/suggestions', function(req, res, next) {
  IngredientsController.getSuggestions(req.query.i, function(err, suggestions) {
    if (err) return res.json({
      error: err,
    });
    
    res.json({
      error: err,
      suggestions
    })
  });
});

module.exports = router;