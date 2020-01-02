function authorization(req, res) {
	console.log(123);
	res.status(200).json({
		success: true,
	});
}

module.exports = authorization;