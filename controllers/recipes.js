const db = require('../db/db');
const mongodb = require('mongodb');
const helpers = require('./helpers');

function collection() {
  return db.get().collection('recipes');
}

exports.getAll = function(done) {
  return helpers.getAll(collection(), done);
}

exports.create = function(recipe, done) {
  return helpers.create(collection(), recipe, done);
}

exports.delete = function(id, done) {
  return helpers.delete(collection(), id, done);
};
