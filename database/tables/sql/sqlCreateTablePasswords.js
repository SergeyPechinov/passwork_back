const {tablesNames} = require('../../../constant/tablesNames');

module.exports = {
	query: id => {
		return `CREATE TABLE IF NOT EXISTS ${tablesNames.userPasswords(id)} (\	
						id SERIAL,\
						PRIMARY KEY(id),\
						id_site character varying(100),\
						id_folder int,\
						name character varying(100),\
						password text,\
						list_tags integer[],\
						list_users_available json[]\
					);`;
	},
	error: id => {
		`Ошибка при создании базы данных ${tablesNames.userPasswords(id)} (210)`
	},
};