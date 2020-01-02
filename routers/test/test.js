function test(req, res) {
	console.log(123);
	res.status(200).json({
		success: true,
		message: 'asdsa as dasdas das d',
	});
}

module.exports = test;