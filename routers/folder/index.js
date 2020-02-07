const
		express = require('express'),
		router = express.Router(),
		add = require('../../functions/folder/add'),
		get = require('../../functions/folder/get');

router
		.post('/', add)
		.post('/get', get);

module.exports = router;