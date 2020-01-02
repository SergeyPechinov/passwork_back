const
		express = require('express'),
		router = express.Router(),
		registration = require('../../functions/auth/registration'),
		authentication = require('../../functions/auth/authentication'),
		authorization = require('../../functions/auth/authorization');

router
		.post('/', authorization)
		.post('/auth', authentication)
		.post('/reg', registration);

module.exports = router;