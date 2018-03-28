const express = require('express');
const router = express.Router();

const ingredientsRouter = require('./ingredients');
const recipesRouter = require('./recipes');

router.use('/ingredients', ingredientsRouter);
router.use('/recipes', recipesRouter);

module.exports = router;