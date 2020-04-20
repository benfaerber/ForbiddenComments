function User(obj) {
	let { id, name, pfp } = obj;
	const loggedIn = id !== -1;
	$('#user-id').val(id);
	$('#comment-textarea').attr(
		'placeholder',
		'Add a comment as ' + name + '...'
	);
	$('#username').text(name);
	$('.my-pfp').attr('src', pfp);

	if (loggedIn) {
		$('#user-banner').show();
		$('#sign-in-button').hide();
	} else {
		$('#user-banner').hide();
		$('#sign-in-button').show();
	}
}
