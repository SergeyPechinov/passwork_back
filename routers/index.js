const
		express = require('express'),
		router = express.Router(),
		passport = require('passport'),
		protected = require('./protected'),

		//ALL ROUTES
		routesAuth = require('./auth');

router.use('/auth', routesAuth);
// router.use('/auth', protected, routesAuth);

module.exports = router;