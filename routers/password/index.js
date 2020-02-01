const
		express = require('express'),
		router = express.Router(),
		add = require('../../functions/password/add');

router
		.post('/', add);

module.exports = router;