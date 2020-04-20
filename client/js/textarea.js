$(() => {
	// Auto resize
	$('.comment-input')
		.each(function () {
			this.setAttribute(
				'style',
				'height:' + this.scrollHeight + 'px;overflow-y:hidden;'
			);
		})
		.on('input change cut paste drop', function () {
			this.style.height = 'auto';
			this.style.height = this.scrollHeight + 'px';
		});
});
