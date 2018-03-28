const db = require('../db/db');

function collection() {
  return db.get().collection('recipes');
}

exports.getAll = function(done) {   
    // Find some documents
  collection().find({}).toArray(function(err, docs) {
    if(err) return done(err, null);
    done(null, docs);
  });
}

exports.create = function(recipe, done) {
  collection().insertOne(recipe, function(err, res) {
    if (err) return done(err, null);

    return done(null, `${recipe.name} added`);
  });  
}