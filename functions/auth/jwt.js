const
		jwt = require('jsonwebtoken'),
		jwtTokenAuth = 'anukaidigulai';

const generateJWT = (email, time) => {
	return jwt.sign({
				data: email,
			},
			jwtTokenAuth,
			{expiresIn: time},
	);
};

const verifyJWT = token => {
	return jwt.verify(token, jwtTokenAuth, (error, decoded) => {
		if (error) {
			return error.name;
		} else {
			return decoded;
		}
	});
};

module.exports = {
	generateJWT,
	verifyJWT,
};

