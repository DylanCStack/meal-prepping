const db = require('../db/db');

exports.getAll = function(done) {
  console.log(db.get());
  // Get the documents collection
  const collection = db.get().collection('ingredients');
  console.log("after collection");
      
    // Find some documents
  collection.find({}).toArray(function(err, docs) {
    if(err) return done(err, null);
    done(null, docs);
  });
}

exports.create = function(ingredient, done) {
  const collection = db.get().collection('ingredients');
  
  collection.insertOne(ingredient, function(err, res) {
    if (err) return done(err, null);

    return done(null, `${ingredient.name} added`);
  });  
}