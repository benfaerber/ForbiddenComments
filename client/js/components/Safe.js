function sanatize(str) {
	return String(str)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

function Safe(obj) {
	let keys = Object.keys(obj);
	keys.forEach((key) => {
		if (typeof obj[key] === 'string') {
			obj[key] = sanatize(obj[key]);
		}
	});
	return obj;
}
