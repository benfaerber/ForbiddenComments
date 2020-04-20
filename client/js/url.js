function findLinks(text) {
	const urlPatt = /([--:\w?@%&+~#=]*\.[a-z]{2,4}\/{0,2})((?:[?&](?:\w+)=(?:\w+))+|[--:\w?@%&+~#=]+)?/gi;
	return text.match(urlPatt);
}

function isYoutubeLinkValid(url) {
	const found = getYoutubeId(url);
	return !!found;
}

function getYoutubeId(url) {
	const youtubePatt = /(?:https?:\/\/)?(?:(?:(?:www\.?)?youtube\.com(?:\/(?:(?:watch\?.*?(v=[^&\s]+).*)|(?:v(\/.*))|(channel\/.+)|(?:user\/(.+))|(?:results\?(search_query=.+))))?)|(?:youtu\.be(\/.*)?))/g;
	const match = youtubePatt.exec(url);

	if (match) {
		const found = match[1] || match[2] || match[6];
		if (!found) {
			return null;
		}

		return found.replace('v=', '');
	} else {
		return null;
	}
}

function linkify(text) {
	let links = findLinks(text);
	links.forEach((link) => {
		let built = link;
		if (!link.startsWith('http')) {
			built = 'https://' + link;
		}
		text = text.replace(link, `<a href="${built}" target="_blank">${link}</a>`);
	});
	return text;
}
