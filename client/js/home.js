//youtube-link
//submit-btn

$(() => {
	let startValid = isYoutubeLinkValid($('#youtube-link').val());
	$('#submit-btn').prop('disabled', startValid);

	$('#youtube-link').on('input change cut paste drop', () => {
		let url = $('#youtube-link').val();
		if (isYoutubeLinkValid(url)) {
			$('#submit-btn').prop('disabled', false);
			$('#youtube-link').removeClass('is-invalid');
		} else {
			$('#submit-btn').prop('disabled', true);
			$('#youtube-link').addClass('is-invalid');
		}
	});

	$('#submit-btn').click(() => {
		let vidId = getYoutubeId($('#youtube-link').val());
		window.location.href = 'http://127.0.0.1:5500/client/video.html?v=' + vidId;
	});
});
