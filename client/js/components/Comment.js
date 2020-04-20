function Comment(obj, sel = '.comments') {
	obj = Safe(obj);
	let {
		pfp,
		username,
		publishedAt,
		text,
		likes,
		dislikes,
		edited,
		parent,
		_id,
		childCount,
	} = obj;

	let isChild = parent !== null;
	if (isChild) {
		sel = `#${parent} .comment-replies`;
	}

	function timeAgo(time) {
		return timeago.format(time * 1000);
	}

	function showText(text) {
		return text;
	}

	function isEdited() {
		return edited ? ' (edited)' : '';
	}

	function setupComment(id) {
		const linkSel = `#${id} .comment-view-replies a`;
		const $link = $(linkSel);
		const $icon = $link.find('.comment-view-reply-arrow');
		const $view = $link.find('.comment-view-replies-view');
		const $replies = $link.closest('div').parent().find('.comment-replies');

		const chev = 'fa-chevron-';
		const up = chev + 'up';
		const down = chev + 'down';

		$('[data-toggle="tooltip"]').tooltip();
		$replies.hide();

		$(document).on('click', linkSel, (event) => {
			event.preventDefault();
			if ($icon.hasClass(up)) {
				$icon.addClass(down).removeClass(up);
				$view.text('View');
				$replies.hide();
			} else {
				$icon.addClass(up).removeClass(down);
				$view.text('Hide');
				$replies.show();
			}
		});

		$(document).on('click', `#${id} .comment-reply-button`, (event) => {
			event.preventDefault();
			let $link = $(event.target);
			console.log(`Clicked reply button for #${id}!`);
		});

		$(document).on('click', `#${id} .like-button`, (event) => {
			event.preventDefault();
			const isLike = $(event.target).closest('a').hasClass('like');
			console.log(isLike ? 'like' : 'dislike');
		});
	}

	function isParent() {
		const data = `
    <div class="comment-view-replies mt-2">
      <a href="#">
        <i class="fas fa-chevron-down comment-view-reply-arrow m-2"></i>
        <span class="comment-view-replies-text">
          <span class="comment-view-replies-view">View</span>
          <span class="comment-view-replies-count">${childCount}</span>
          ${childCount === 1 ? 'Reply' : 'Replies'}
        </span>
      </a>
    </div>
    <div class="comment-replies">
      
    </div>
    `;

		return !isChild && childCount > 0 ? data : '';
	}

	const elem = `
  <div class="comment row mt-4" id="${_id}">
  <div class="profile-img col-lg-1 ${isChild ? 'col-sm-1' : 'col-sm-2'}">
    <img src="${pfp}" alt="Profile Pic" class="pfp ${
		isChild ? 'pfp-sm' : 'pfp-lg'
	}" />
  </div>
  <div class="comment-text col-lg-6 col-sm-10">
      <div class="comment-header">
        <strong>${username}</strong>
        <span class="text-muted">${timeAgo(publishedAt)}${isEdited()}</span>
      </div>
      <div class="comment-content mt-1 mb-2">
        ${showText(text)}
      </div>
      <div class="comment-buttons text-muted">
        <span class="comment-likes">
          <a
            data-toggle="tooltip"
            data-placement="bottom"
            data-original-title="Like"
            class="like-button like text-muted no-dec"
						href="#"
          >
            <i class="fas fa-thumbs-up m-1"></i>
          </a>
          <span class="like-count">${likes}</span>
        </span>
        <span class="comment-dislikes m-3">
          <a
            data-toggle="tooltip"
            data-placement="bottom"
            data-original-title="Dislike"
            class="like-button dislike text-muted no-dec"
						href="#"
          >
            <i class="fas fa-thumbs-down m-1"></i>
          </a>
          <span class="dislike-count">${dislikes}</span>
        </span>
        <a href="#" class="comment-reply-button no-dec text-muted m-2"
          >REPLY</a
        >
      </div>
      ${isParent()}
    </div>
  </div>
  <!-- End ${isChild ? 'Subcomment' : 'Comment'}-->
  `;

	$(sel).append(elem);
	setupComment(_id);
}

let json = {
	_id: '5e993018cee16f502462e518',
	parent: null,
	video: 'jNQXAC9IVRw',
	text: 'ost oy jn sh qtob tat ',
	likes: 100,
	dislikes: 20,
	edited: false,
	userId: -1,
	username: 'Anonymous',
	pfp: 'http://localhost:8080/static/anon256.png',
	publishedAt: 1587097624,
	editedAt: -1,
	deleted: false,
};
