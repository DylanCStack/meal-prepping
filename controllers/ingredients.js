const db = require('../db/db');

function collection() {
  return db.get().collection('ingredients');
}

exports.getAll = function(done) {   
    // Find some documents
  collection().find({}).toArray(function(err, docs) {
    if(err) return done(err, null);
    done(null, docs);
  });
}

exports.create = function(ingredient, done) {
  collection().insertOne(ingredient, function(err, res) {
    if (err) return done(err, null);

    return done(null, `${ingredient.name} added`);
  });  
}

exports.getSuggestions = function(query, done) {
  const regexp = new RegExp(`/^${query}/i`);
  collection().find({'name': {'$regex' : `^${query}`, '$options' : 'i'}}).toArray(function(err, docs) {
    if (err) return done(err, null);

    done(null, docs);
  });
}