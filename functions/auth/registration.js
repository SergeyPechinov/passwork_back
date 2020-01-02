const
		{clientDB} = require('../../database/client'),
		{tablesNames} = require('../../constant/tablesNames');

const registration = (req, res) => {
	const
			email = req.body.email,
			name = req.body.name,
			password = req.body.password;

	const query = `\
					INSERT INTO ${tablesNames.users}\
						(email, name, password_master)\
					VALUES
			      ('${email}', '${name}', '${password}');`;

	clientDB.query(query, error => {
		if (error) {
			process.env.NODE_ENV === 'prod' ?
					logs(`Ошибка регистрации (возомжно, что пользователь с таким email уже зарегистрирован) (${email}) (402) Error: ${error}`, true)
					:
					console.log(`Ошибка регистрации (возомжно, что пользователь с таким email уже зарегистрирован) (${email}) (402) Error: ${error}`);
			res.status(400).json({success: false});
		} else {
			logs(`Пользователь '${email}' зарегистрирован`);
			res.status(200).json({success: true});
		}
	});
};

module.exports = registration;