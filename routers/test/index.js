const
		express = require('express'),
		router = express.Router(),
		test = require('./test');

router
		.post('/', test);

module.exports = router;