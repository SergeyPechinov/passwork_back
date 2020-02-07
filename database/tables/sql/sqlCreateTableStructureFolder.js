const {tablesNames} = require('../../../constant/tablesNames');

module.exports = {
	query: id => {
		return `CREATE TABLE IF NOT EXISTS ${tablesNames.userStructureFolder(id)} (\	
						id SERIAL,\
						PRIMARY KEY(id),\
						id_folder_parent int,\
						name character varying(100),\
						list_users_available integer[]\
					);`;
	},
	error: id => {
		`Ошибка при создании базы данных ${tablesNames.userStructureFolder(id)} (210)`
	},
};