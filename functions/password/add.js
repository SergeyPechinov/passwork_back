const
		{clientDB} = require('../../database/client'),
		{tablesNames} = require('../../constant/tablesNames');

module.exports = (req, res) => {
	const
			userId = req.body.id,
			namePassword = req.body.namePassword,
			nameSite = req.body.nameSite,
			password = req.body.password;

	const query = `\
		INSERT INTO ${tablesNames.userPasswords(userId)}\
			(name, id_site, password)\
		VALUES
			('${namePassword}', '${nameSite}', '${password}')`;

	const errors = {
		namePassword: namePassword.length > 0,
		nameSite: nameSite.length > 3,
		password: password.length > 0
	};

	if (
			errors.namePassword &&
			errors.nameSite &&
			errors.password
	) {
		addPasswordQuery(query, res);
	} else {
		res.status(400).json({
			success: false,
			messages: {
				namePassword: errors.namePassword ? '' : 'Минимум 1 символ',
				nameSite: errors.nameSite ? '' : 'Минимум 4 символа',
				password: errors.password ? '' : 'Минимум 1 символ'
			}
		});
	}
};

const addPasswordQuery = (query, res) => {
	clientDB.query(query, error => {
		if (error) {
			res.status(400).json({
				success: false,
			});
		} else {
			res.status(200).json({
				success: true,
			});
		}
	});
};