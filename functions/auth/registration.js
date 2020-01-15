const
		{clientDB} = require('../../database/client'),
		{tablesNames} = require('../../constant/tablesNames'),
		{validatorEmail} = require('./../../common/validators'),
		{logs} = require("../../common/logs");

const registration = (req, res) => {
	const
			email = req.body.email,
			name = req.body.name,
			password = req.body.password;

	const errors = {
		email: !validatorEmail(email),
		name: !(name.length >= 2),
		password: !(password.length >= 8),
	};

	const query = `\
					INSERT INTO ${tablesNames.users}\
						(email, name, password_master)\
					VALUES
			      ('${email}', '${name}', '${password}')\
		      RETURNING id;`;

	if (errors.email || errors.name || errors.password) {
		res.status(400).json({
			success: false,
			messages: {
				emailError: errors.email ? 'Не верно заполнен email' : '',
				nameError: errors.name ? 'Минимум 2 символа' : '',
				passwordError: errors.password ? 'Минимум 8 символов' : '',
			}
		});
	} else {
		registrationQuery(query, email, res);
	}
};

const createTablesUsers = id => {
	const createTable = require('./../../database/tables/createTablesUser');
	createTable(id, 'structureFolder');
	createTable(id, 'passwords');
	createTable(id, 'tags');
};

const registrationQuery = (query, email, res) => {
	clientDB.query(query, (error, result) => {
		if (error) {
			process.env.NODE_ENV === 'prod' ?
					logs(`Ошибка регистрации (возомжно, что пользователь с таким email уже зарегистрирован) (${email}) (402) Error: ${error}`, true)
					:
					console.log(`Ошибка регистрации (возомжно, что пользователь с таким email уже зарегистрирован) (${email}) (402) Error: ${error}`);
			res.status(400).json({success: false, message: 'Пользователь с таким email уже зарегистрирован!'});
		} else {
			logs(`Пользователь '${email}' зарегистрирован`);

			try {
				createTablesUsers(result.rows[0].id);
				res.status(200).json({success: true});
			} catch (error) {
				res.status(400).json({success: false});
			}
		}
	});
};

module.exports = registration;