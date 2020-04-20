function Video(obj) {
	let {
		id,
		thumbnail,
		title,
		description,
		channel,
		publishedAt,
		views,
		likes,
		commentsAllowed,
		comments,
	} = obj;

	function parseDescription() {
		description = sanatize(description);
		description = description.split('\n').join('<br />');
		return linkify(description);
	}

	const date = new Date(publishedAt * 1000).toLocaleDateString();
	const url = 'https://youtube.com/watch?v=' + id;

	$('#video-title').text(title);
	$('#video-thumbnail').attr('src', thumbnail);
	$('#video-channel').text(channel);
	$('#video-date').text(date);

	if (!comments) {
		comments = 0;
	}

	if (commentsAllowed) {
		$('#comments-enabled').show();
		$('#comments-disabled').hide();
	} else {
		$('#comments-enabled').hide();
		$('#comments-disabled').show();
	}

	comments = parseInt(comments);
	$('#video-youtube-comment-count').text(comments.toLocaleString());
	$('#video-comment-count').text('nyi');

	views = parseInt(views);
	$('#video-views').text(views.toLocaleString());
	likes = parseInt(likes);
	$('#video-likes').text(likes.toLocaleString());

	$('#video-description').html(parseDescription());

	$('#video-link').attr('href', url);
}
