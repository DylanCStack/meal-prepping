const express = require('express');
const router = express.Router();

const RecipesController = require('../controllers/recipes.js');

router.get('/', function(req, res, next) {
  RecipesController.getAll(function(err, recipes) {
    if (err) return res.json({
      error: err,
    });
    res.json({
      recipes,
    });
  });
});

router.post('/add', function(req, res, next) {
  RecipesController.create(req.body, function(err, response) {
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