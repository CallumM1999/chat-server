const User = require('../models/user');

const countUsers = regexString => User.count({
	$or: [
		{ fname: regexString },
		{ lname: regexString }
	]
});

const getUsers = regexString => new Promise(async (resolve, reject) => {
	User.find({
		$or: [
			{ fname: regexString },
			{ lname: regexString }
		]
	})
		.select({
			fname: 1, lname: 1
		})
		.limit(20)
		.exec((err, res) => {
			resolve(res);
		});
});

const userSearch = (queryString, _id) => new Promise(async (resolve, reject) => {
	const regexString = new RegExp(`.*${queryString}.*`, 'i');
	const queryResponse = await Promise.all([countUsers(regexString), getUsers(regexString)]);

	let removedUserCount = 0;
	const filteredUsers = queryResponse[1].filter(item => {
		if (item._id == _id) {
			removedUserCount++;
			return false;
		}
		return true;
	});

	resolve({
		count: queryResponse[0] - removedUserCount,
		users: filteredUsers
	});
});

module.exports = userSearch;