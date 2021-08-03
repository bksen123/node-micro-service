var User = require("../models/users.model");
var MD5 = require("md5");
const GlobalService = require("../core/global.service.js");
require("dotenv").config();

exports.doSignup = (req, res) => { // SIGNUP
	postData = req.body;
	var newUser = new User(postData);
	newUser.updatedAt = new Date();
	newUser.createdAt = new Date();
	if (newUser.password) {
		newUser.password = MD5(postData.password);
	}
	newUser.save((err, data) => {
		if (err) {
			return res.json({
				status: 500,
				message: "Failed to create account.",
				data: err
			});
		} else {
			return res.json({
				status: 200,
				message: "Account created succesfully.",
				data: data
			});
		}
	});
};

exports.doSignin = (req, res) => { // DO SIGNIN
	var postData = req.body;
	var where = {
		email: postData.email,
		password: MD5(postData.password),
	};
	User.findOne(where, function (err, userResp) {
		if (userResp) {
			req.session.current_user = userResp;
			res.json({
				status: 200,
				message: "Logged in successfully.",
				data: userResp,
			});
		} else {
			res.json({
				status: 500,
				message: "There is some error while fetching the user!",
				data: err,
			});
		}
	});
};

exports.emailAlreadyExits = (req, res) => { // GET THE USERNAME FOR CHECKING EXISTING
	var postData = req.body;
	var whereObj = {
		email: postData.email
	}
	Users.find(whereObj, function (err, data) {
		if (err) {
			return res.json({
				status: 500,
				message: 'Some error occrred while getting the email already exits email.',
				data: err
			});
		} else {
			return res.json({
				status: 200,
				message: 'This email is not getting successfully.',
				data: data
			});
		}
	});
}

exports.forgotPassword = (req, res) => { // GET THE USERNAME FOR CHECKING EXISTING
	var postData = req.body;
	const email = postData.email;
	if (email) {
		var whereObj = {
			email: postData.email
		}
		Users.findOne(whereObj, function (err, user) {
			if (err) {
				return res.json({
					status: 500,
					message: 'Unalbe to login!, Please check you email and password.',
				});
			} else {
				return res.json({
					status: 200,
					// key: rString,
					message: 'Please check your email, Reset password link has been sent to ' + email,
					// data: data
				});
				/* 				const rString = exports.randomString(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
									console.log('rString================', rString);
								Users.updateOne({_id: user._id}, {
									link: rString,
									forgotStatus: 1
								},function(err, forgotResp) { 
										if (err) { 
											res.json({
												status: 500,
												message: 'No account found with this email address : ' + email
											});
										} 
										else { 
											console.log('forgotResp====2222222222222=====', user);
											if (user) {
												const userData = user;
												const linkParam = sails.config.custom.RECOVER_PASSWORD_URL + '?userId=' + userData.id + '&key=' + rString;
												const recoverPasswordLink = sails.config.custom.REDIRECT_APP_URL + '/' + linkParam;
												const logo = sails.config.custom.REDIRECT_APP_URL + '/assets/img/mail_logo.png';
												const emailObj = {
													emailType: 'fotgotPassword',
													name: userData.username,
													projectName: sails.config.custom.PROJECT,
													email: userData.email,
													recoverPasswordLink: recoverPasswordLink,
													subject: 'Reset your password',
													templatePath: '/emailtemplates/forgotpassword',
													logo: logo
												};
											
												GlobalService.getEmailMessage(emailObj, (err, data) => {
													if (err) {
														return res.json({
															status: 500,
															message: 'Unable to send a error due to some network issue. Please try after some time.'
														});
													} else {
														return res.json({
															status: 200,
															key: rString,
															message: 'Please check your email, Reset password link has been sent to ' + userData.email,
															data: data
														});
													}
												});
											}
										} 
								}); */
			}
		});
	} else {
		return res.json({
			status: 500,
			message: 'Unalbe to login!, Please check you email and password.',
		});
	}
}

exports.randomString = (length, chars) => {
	let result = '';
	for (let i = length; i > 0; --i) {
		result += chars[Math.floor(Math.random() * chars.length)];
	}
	return result;
}

exports.authentication = (req, res) => {
	var allData = req.body;
	if (req.session.current_user) {
		return res.json({
			status: 200,
			message: 'Api authenticated Successfully.',
			current_user: req.session.current_user
		});
	} else {
		return res.json({
			status: 500,
			message: 'Authentication failed',
			current_user: null
		});
	}
};

exports.logout = (req, res) => {
	req.session.destroy();
	return res.json({
		status: 200,
		message: 'Logouted successfully.',
	});
};


exports.test = (req, res) => {
	// req.session.destroy();

	return res.json({
		status: 200,
		message: 'user api micro service working fine.',
		env: process.env.test
	});
};