const jwt = require('jsonwebtoken');
const {generateJWT, verifyJWT} = require('../functions/auth/jwt');

module.exports = (req, res, next) => {

	// if (email === 'inok') {
	if (true) {
		next();
	} else {
		res.status(401).json({
			success: false,
			auth: false,
		});
	}
};