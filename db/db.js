const MongoClient = require('mongodb').MongoClient;
const secret = require('./secret.js');

const state = {
  db: null,
};

exports.connect = function(done) {
  if (state.db) return done();
  MongoClient.connect(secret.dbURL, (err, client) => {
    console.log('Database Connected');
    if(err) return doNotTrack(err);
    state.db = client.db('meal-prepping');
    done();
  });
}

exports.get = function() {
  return state.db;
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}