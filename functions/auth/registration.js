const
		{clientDB} = require('../../database/client'),
		{tablesNames} = require('../../constant/tablesNames');

const registration = (req, res) => {
	const
			email = req.body.email,
			name = req.body.name;

	const query = `\
					INSERT INTO ${tablesNames.users}\
						(email, name)\
					VALUES
			      ('${email}', '${name}');`;

	clientDB.query(query, error => {
		if (error) {
			res.status(400).json({success: false});
		} else {
			res.status(200).json({success: true});
		}
	});
};

module.exports = registration;