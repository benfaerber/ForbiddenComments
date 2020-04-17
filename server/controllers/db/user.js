const User = require('../../models/User');

module.exports = (db, ObjectId) => {
  var uc = db.collection('users');
  var module = {};

  module.getUser = async (userId) => {
    let found = await uc.findOne({ id: userId });
    if (!found) {
      return null;
    } else {
      return new User(found);
    }
  };

  module.createUser = async (user) => {
    json = user.toJson();
    await uc.insertOne(json);
  };

  module.playground = async () => {};

  return module;
};
