const
		{clientDB} = require('../../database/client'),
		{tablesNames} = require('../../constant/tablesNames.js');

module.exports = (req, res) => {
	console.log(req.body);

	const
			name = req.body.name,
			id_parent = req.body.id_parent ? req.body.id_parent : 0;

	if (name.length > 0) {
		console.log(id_parent);

		const query = `
		INSERT INTO ${tablesNames.userStructureFolder(req.body.id)}\
			(id_folder_parent, name)\
		VALUES\
			('${id_parent}', '${name}')`;

		addFolderQuery(query, res);
	} else {
		res.status(400).json({
			success: false,
			mes: 'Длина названия папки менее 1 символа'
		});
	}
};

const addFolderQuery = (query, res) => {
	clientDB.query(query, error => {
		if (error) {
			res.status(400).json({
				success: false,
				message: 'Ошибка в запросе'
			});
		} else {
			res.status(200).json({
				success: true
			});
		}
	});
};