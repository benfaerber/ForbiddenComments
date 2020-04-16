module.exports = class Comment {
  constructor(json) {
    this._id = json._id || -1;
    this.parent = json.parent || null;
    this.video = json.video;
    this.text = json.text;
    this.likes = json.likes;
    this.dislikes = json.dislikes;
    this.edited = json.edited || false;
    this.userId = json.userId;
    this.username = json.username;
    this.pfp = json.pfp;
  }

  toJson() {
    return {
      _id: this._id,
      parent: this.parent,
      video: this.video,
      text: this.text,
      likes: this.likes,
      dislikes: this.dislikes,
      edited: this.edited,
      userId: this.userId,
      username: this.username,
      pfp: this.pfp,
    };
  }
};
