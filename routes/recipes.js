const express = require('express');
const router = express.Router();

const RecipesController = require('../controllers/recipes.js');

router.get('/', function(req, res, next) {
  res.json({
    ok: 'ok',
  });
})

module.exports = router;