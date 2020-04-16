const Comment = require('../../models/Comment');

module.exports = (db) => {
  var cc = db.collection('comments');
  var module = {};

  module.getComment = async (commentId) => {};

  module.createComment = async (comment) => {
    const json = comment.toJson();
  };

  module.playground = async () => {
    //console.log('hello');
  };

  return module;
};
