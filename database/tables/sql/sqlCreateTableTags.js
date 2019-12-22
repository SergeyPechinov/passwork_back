const {tablesNames} = require('../../../constant/tablesNames');

module.exports = {
	query: id => {
		return `CREATE TABLE IF NOT EXISTS ${tablesNames.userTags(id)} (\	
						id SERIAL,\
						PRIMARY KEY(id),\
						name character varying(100)\
					);`;
	},
	error: id => {
		`Ошибка при создании базы данных ${tablesNames.userTags(id)} (210)`
	},
};