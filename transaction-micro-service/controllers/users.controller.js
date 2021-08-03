var User = require("../models/users.model");
var MD5 = require("md5");
const GlobalService = require("../core/global.service.js");
require("dotenv").config();
exports.test = (req, res) => {
	// req.session.destroy();
	return res.json({
		status: 200,
		message: 'transaction api micro service working fine.',
		env: process.env.test
	});
};

exports.randomString = (length, chars) => {
	let result = '';
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}