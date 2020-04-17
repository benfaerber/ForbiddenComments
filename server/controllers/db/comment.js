const Comment = require('../../models/Comment');

module.exports = (db, ObjectId) => {
  var cc = db.collection('comments');
  var module = {};

  module.getComment = async (commentId) => {
    const oId = new ObjectId(commentId);
    let grabbed = await cc.findOne({ _id: oId });
    if (grabbed) {
      return new Comment(grabbed);
    } else {
      return null;
    }
  };

  module.createComment = async (comment) => {
    const json = comment.toJson();
    await cc.insertOne(json);
  };

  module.updateComment = async (id, newText) => {
    const oId = new ObjectId(id);
    const now = Math.round(new Date().getTime() / 1000);
    await cc.updateOne(
      { _id: oId },
      { $set: { editedAt: now, text: newText, edited: true } }
    );
  };

  module.deleteComment = async (id) => {
    const oId = new ObjectId(id);
    await cc.updateOne({ _id: oId }, { $set: { deleted: true } });
  };

  module.getParentComments = async (videoId, chunk) => {
    // Comments grabbed per request
    const chunkSize = 20;

    let results = await cc
      .find({
        $and: [{ deleted: false }, { parent: null }, { video: videoId }],
      })
      .toArray();

    let startLocation = chunk * chunkSize;
    let endLocation = startLocation + chunkSize;

    if (endLocation >= results.length) {
      return {
        comments: results.slice(startLocation, results.length),
        isDone: true,
      };
    } else {
      return {
        comments: results.slice(startLocation, endLocation),
        isDone: false,
      };
    }
  };

  module.getChildComments = async (commentId) => {
    return await cc.find({ parent: commentId }).toArray();
  };

  module.playground = async () => {};

  return module;
};
