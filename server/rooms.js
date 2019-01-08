const store = {};

const add = (title, id) => {
	store[id] = {
		title,
		_id: 'aaabbb',
		messages: [],
		members: ['5c11429cdf1cd416b2b8b452', '5c1229362280a7dfb5f5f97f']
	};
};

module.exports = {
	add,
	store
};