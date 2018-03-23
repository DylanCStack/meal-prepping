const express = require('express');
const router = express.Router();

const IngredientsController = require('../controllers/ingredients.js');

/* GET users listing. */
router.get('/ingredients', function(req, res, next) {
  console.log("GET ingredients");
	IngredientsController.getAll(function(err, ingredients) {
    if (err) return res.json({
      error: err,
    });
    console.log(ingredients);
     res.json({
      ingredients,
    });
  });
});

router.post('/ingredient', function(req, res, next) {
  console.log(req.body);
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