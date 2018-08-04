const mongodb = require('mongodb');

exports.getAll = function(collection, done) {
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      if(err) return done(err, null);
      done(null, docs);
    });
}

exports.create = function(collection, document, done) {
  collection.insertOne(document, function(err, res) {
    if (err) return done(err, null);

    return done(null, `${document.name} added`);
  });  
}

exports.delete = function(collection, id, done) {
  collection.deleteOne({_id: new mongodb.ObjectId(id)}, function(err, res) {
    if (err) return done(err, null);

    done(false, {
      success: res.deletedCount,
    });
  })
}