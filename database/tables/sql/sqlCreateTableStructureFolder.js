const {tablesNames} = require('../../../constant/tablesNames');

module.exports = {
	query: id => {
		return `CREATE TABLE IF NOT EXISTS ${tablesNames.userStructureFolder(id)} (\	
						id_folder SERIAL,\
						PRIMARY KEY(id_folder),\
						id_folder_parent int,\
						list_users_available integer[]\
					);`;
	},
	error: id => {
		`Ошибка при создании базы данных ${tablesNames.userStructureFolder(id)} (210)`
	},
};