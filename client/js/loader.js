$(() => {
	// My user
	User({
		id: -1,
		name: 'Ben Faerber',
		pfp:
			'https://lh3.googleusercontent.com/a-/AOh14GjH8rd42Lrv80DaUqiGYCYjbHKaFueIPpyDdgUBpQ',
		locale: 'en',
		status: 'ok',
	});

	// Video Comment
	Video({
		id: 'A4QUE1tSIHY',
		thumbnail: 'https://i.ytimg.com/vi/A4QUE1tSIHY/sddefault.jpg',
		title: '0-100 years in Holland (Amsterdam)',
		description:
			'From baby to 100 year old, this is the video that first went viral in 2012. Ever since I posted this film, people have requested that I subtitle it but I have always resisted because I thought that everyone could count from 0 to 100. Why translate the obvious?\nBut in time I have started to understand why people would want a translation. I can imagine you lose track somewhere and want to know exactly where you are in the process. So apologies for the delay but here it is, finally: a version everyone in the world can count along with. Enjoy!\n\nwww.imaginevideo.nl\n\n0-100 years in America: https://youtu.be/86qBAryeFco\n0-100 years in Spain: https://youtu.be/ocPjB4szjM0\n0-100 years Boys Only: https://youtu.be/kz9WXFEpMi8\n0-100 years Girls Only: https://youtu.be/ZqHFBrV-oOc\n0-100 years in French (Senegal): https://youtu.be/6gWd8cy2Lgs\n0-100 years in Arabic (Morocco): https://youtu.be/5MmENtIG1YE',
		channel: 'ImagineVideoclips',
		publishedAt: 1402518868,
		views: '14222311',
		likes: '186284',
		commentsAllowed: true,
		comments: '34894',
		status: 'ok',
	});

	// Parent comment
	Comment({
		_id: '5e993018cee16f502462e518',
		parent: null,
		video: 'jNQXAC9IVRw',
		text: 'ost oy jn sh qtob tat ',
		likes: 100,
		dislikes: 20,
		edited: false,
		userId: -1,
		username: 'Anonymous',
		pfp: 'http://localhost:5500/client/img/anon.png',
		publishedAt: 1587092624,
		editedAt: -1,
		deleted: false,
		childCount: 1,
	});

	// Child Comment
	Comment({
		_id: '5e993018cee16f12342314',
		parent: '5e993018cee16f502462e518',
		video: 'jNQXAC9IVRw',
		text: 'What an interesting thought',
		likes: 13,
		dislikes: 2,
		edited: true,
		userId: -1,
		username: 'Ben Faerber',
		pfp:
			'https://lh3.googleusercontent.com/a-/AOh14GjH8rd42Lrv80DaUqiGYCYjbHKaFueIPpyDdgUBpQ',
		publishedAt: 1587097624,
		editedAt: -1,
		deleted: false,
		childCount: 0,
	});
});
