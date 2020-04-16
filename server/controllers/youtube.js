const YouTube = require('youtube-node');
const api = new YouTube();
require('dotenv').config();
const { YOUTUBE_API_KEY } = process.env;
api.setKey(YOUTUBE_API_KEY);

const Video = require('../models/Video');

exports.getVideo = (id, callback) => {
  api.getById(id, function (error, result) {
    console.log(error);
    if (error) {
      callback(null);
    } else {
      const vid = new Video(result);
      callback(vid);
    }
  });
};
