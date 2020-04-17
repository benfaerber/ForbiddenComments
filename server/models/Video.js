module.exports = class Video {
  constructor(result) {
    const vid = result.items[0];
    const stats = vid.statistics;
    const { snippet } = vid;

    this.id = vid.id;
    this.thumbnail = this.findBestThumbnail(snippet.thumbnails);
    this.title = snippet.title;
    this.description = snippet.description;
    this.channel = snippet.channelTitle;
    this.publishedAt = Math.round(
      new Date(snippet.publishedAt).getTime() / 1000
    );

    this.view = stats.viewCount;
    this.likes = stats.likeCount;
    this.commentsAllowed = !!stats.commentCount;
    this.comments = stats.commentCount;
  }

  findBestThumbnail(thumbnails) {
    let best = null;
    Object.keys(thumbnails).forEach((key) => {
      let thumb = thumbnails[key];
      if (!best || thumb.width > best.width) {
        best = thumb;
      }
    });
    return best.url;
  }
};
