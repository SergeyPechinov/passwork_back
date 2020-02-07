const
		{tablesNames} = require('../../constant/tablesNames'),
		{clientDB} = require('../../database/client');

module.exports = (req, res) => {

	const query = `SELECT * FROM ${tablesNames.userStructureFolder(req.body.id)}`;

	clientDB.query(query, (error, result) => {
		if (error) {
			res.status(400).json({
				success: false,
				message: 'Ошибка в запросе'
			});
		} else {
			res.status(200).json({
				success: true,
				data: result.rows,
			});
		}
	});
};