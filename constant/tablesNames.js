const userStructureFolder = id => {
	return `user_${id}_structure_folder`;
};

const userPasswords = id => {
	return `user_${id}_passwords`;
};

const userTags = id => {
	return `user_${id}_tags`;
};

const tablesNames = {
	users: 'users',
	userStructureFolder,
	userPasswords,
	userTags,
};

module.exports = {
	tablesNames: tablesNames,
};