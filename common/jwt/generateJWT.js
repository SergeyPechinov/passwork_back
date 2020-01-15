const {generateJWT} = require('./jwt');

const generateAccess = email => {
	// return generateJWT(email, 5);
	return generateJWT(email, 60 * 60);
};

const generateRefresh = email => {
	// return generateJWT(email, 30);
	return generateJWT(email, 60 * 60 * 24 * 30);
};

const generateFull = email => {
	return {
		access: generateAccess(email),
		refresh: generateRefresh(email),
	}
};

module.exports = {
	generateAccess,
	generateRefresh,
	generateFull,
};