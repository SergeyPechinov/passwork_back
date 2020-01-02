const
		express = require('express'),
		router = express.Router(),
		// authorization = require('./authorization'),
		registration = require('../../functions/auth/registration'),
		authorization = require('../../functions/auth/authorization');

router
		.post('/', authorization)
		.get('/', registration);

module.exports = router;