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
	jwt.verify(token, jwtTokenAuth, (error, decoded) => {
		console.log(token);
		console.log(123);
		console.log(error);
		console.log(decoded);
		if (error) {
			return error.message;
		} else {
			return decoded;
		}
	});
};

module.exports = {
	generateJWT,
	verifyJWT,
};

