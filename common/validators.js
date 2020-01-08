const validatorEmail = email => {
	const regular = /^(([^@"]+(\.[^@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Zа-яА-Я\-0-9]+\.)+[a-zA-Zа-яА-Я]{2,}))$/;
	return regular.test(email);
};

module.exports = {
	validatorEmail,
};