const mongo = require('./db/mongo');
const User = require('../models/User');

exports.findOrCreate = async (data, callback) => {
  let { _json: json } = data.profile;
  let user = new User(json);
  let found = await mongo.user.getUser(user.id);
  if (!found) {
    await mongo.user.createUser(user);
  }
  callback(null, data.profile.id);
};

exports.loadUser = async (id, callback) => {
  let found = await mongo.user.getUser(id);
  callback(null, found);
};
