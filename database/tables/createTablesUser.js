const
		{clientDB} = require('./../client'),
		{logs} = require('./../../common/logs');

//какие могут быть входные данные
//    structureFolder
//    passwords

module.exports = (id, nameTable) => {
	let sqlQuery = null;

	switch (nameTable) {
		case 'structureFolder':
			sqlQuery = require('./sql/sqlCreateTableStructureFolder');
			break;
		case 'passwords':
			sqlQuery = require('./sql/sqlCreateTablePasswords');
			break;
		case 'tags':
			sqlQuery = require('./sql/sqlCreateTableTags');
			break;
		default:
			return false;
	}

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