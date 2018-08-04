const db = require('../db/db');
const mongodb = require('mongodb');
const helpers = require('./helpers');

function collection() {
  return db.get().collection('ingredients');
}

exports.getAll = function(done) {
  return helpers.getAll(collection(), done);
}

exports.create = function(ingredient, done) {
  return helpers.create(collection(), ingredient, done);
}

exports.delete = function(id, done) {
  return helpers.delete(collection(), id, done);
};

exports.getSuggestions = function(query, done) {
  const regexp = new RegExp(`/^${query}/i`);
  collection().find({'name': {'$regex' : `^${query}`, '$options' : 'i'}}).toArray(function(err, docs) {
    if (err) return done(err, null);

    done(null, docs);
  });
}