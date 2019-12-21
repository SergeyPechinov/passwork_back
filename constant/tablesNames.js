const userStructureFolder = id => {
	return `user_${id}_structure_folder`;
};

const tablesNames = {
	users: 'users',
	userStructureFolder: userStructureFolder,
};

module.exports = {
	tablesNames: tablesNames,
};