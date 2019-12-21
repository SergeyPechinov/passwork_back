const
		{clientDB} = require('./../client'),
		sqlQuery = require('./sql/sqlCreateTableUsers'),
		{logs} = require('./../../common/logs');

module.exports = () => {
	clientDB.query(sqlQuery.query, error => {
		if (error) {
			if (process.env.NODE_ENV === 'prod') {
				console.error(sqlQuery.error);
				logs(sqlQuery.error, true);
			} else {
				console.error(sqlQuery.error);
				console.error(error);
			}
		}
	});
};