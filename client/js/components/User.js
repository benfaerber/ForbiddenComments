function User(obj) {
	let { id, name, pfp } = obj;
	const loggedIn = id !== '-1'; // Google ids are stored as strings
	$('#user-id').val(id);
	$('#comment-textarea').attr(
		'placeholder',
		'Add a comment as ' + name + '...'
	);
	$('#username').text(name);
	$('.my-pfp').attr('src', pfp);

	if (loggedIn) {
		$('#sign-in-button').hide();
		$('#sign-out-button').show();
	} else {
		$('#sign-in-button').show();
		$('#sign-out-button').hide();
	}
}
