const
		{clientDB} = require('./../client'),
		sqlQuery = require('./sql/sqlCreateTableStructureFolder'),
		{logs} = require('./../../common/logs');

module.exports = (id) => {
	const sqlErrorMessage = sqlQuery.error(id);

	clientDB.query(sqlQuery.query(id), error => {
		if (error) {
			if (process.env.NODE_ENV === 'prod') {
				console.error(sqlErrorMessage);
				logs(sqlErrorMessage, true);
			} else {
				console.error(sqlErrorMessage);
				console.error(error);
			}
		}
	});
};