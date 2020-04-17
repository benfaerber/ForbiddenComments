const Comment = require('../models/Comment');
const userController = require('./user');
const mongo = require('./db/mongo');

const error = { status: 'bad' };
const ok = { status: 'ok' };

exports.makeComment = async (params, user) => {
  if (!user) {
    user = userController.anon();
  }

  const { p: parent, v: video, t: text } = params;
  const isChild = !!parent;
  if (!video || !text) {
    return error;
  }

  const now = Math.round(new Date().getTime() / 1000);

  const { id, name, pfp } = user;
  const comment = new Comment({
    parent: parent,
    video: video,
    text: text,
    userId: id,
    username: name,
    pfp: pfp,
    publishedAt: now,
  });
  await mongo.comment.createComment(comment);
  return ok;
};

exports.editComment = async (params, user) => {
  const { id, t: text } = params;
  if (!id || !text || !user) {
    return error;
  }

  let comment = await mongo.comment.getComment(id);
  if (!comment || user.id != comment.userId) {
    return error;
  }

  await mongo.comment.updateComment(id, text);
  return ok;
};

exports.deleteComment = async (id, user) => {
  if (!id || !user) {
    return error;
  }

  let comment = await mongo.comment.getComment(id);
  if (!comment || user.id != comment.userId) {
    return error;
  }

  await mongo.comment.deleteComment(id);
  return ok;
};

exports.fillDummyData = async (amount) => {
  const alpha = 'abcdefghijklmnopqrstuvwxyz'.split('');
  for (let i = 0; i < amount; i++) {
    let built = '';

    for (let j = 0; j < Math.random() * 6 + 2; j++) {
      for (let k = 0; k < Math.random() * 6; k++) {
        built += alpha[Math.floor(Math.random() * alpha.length - 1)] || 'a';
      }
      built += ' ';
    }

    await exports.makeComment({ v: 'jNQXAC9IVRw', t: built });
  }
};

exports.getParentComments = async (videoId, chunk) => {
  return await mongo.comment.getParentComments(videoId, chunk);
};

exports.getChildComments = async (commentId) => {
  return await mongo.comment.getChildComments(commentId);
};
