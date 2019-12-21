const {tablesNames} = require('../../../constant/tablesNames');

module.exports = {
	query: `CREATE TABLE IF NOT EXISTS ${tablesNames.users} (\	
						id SERIAL,\
						PRIMARY KEY(id),\
						id_password_available integer[],\
						email character varying(100) NOT NULL UNIQUE,\
						surname character varying(100),\
						name character varying(100) NOT NULL,\
						second_name character varying(30),\
						password_master text NOT NULL,\
						token text,\
						photo text\
					);`,
	error: `Ошибка при создании базы данных ${tablesNames.users} (210)`,
};