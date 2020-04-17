module.exports = class Comment {
  constructor(json) {
    this._id = json._id || -1;
    this.parent = json.parent || null;
    this.video = json.video;
    this.text = json.text;
    this.likes = json.likes || 0;
    this.dislikes = json.dislikes || 0;
    this.edited = json.edited || false;
    this.userId = json.userId;
    this.username = json.username;
    this.pfp = json.pfp;
    this.publishedAt = json.publishedAt;
  }

  toJson() {
    return {
      parent: this.parent,
      video: this.video,
      text: this.text,
      likes: this.likes,
      dislikes: this.dislikes,
      edited: this.edited,
      userId: this.userId,
      username: this.username,
      pfp: this.pfp,
      publishedAt: this.publishedAt,
    };
  }
};
