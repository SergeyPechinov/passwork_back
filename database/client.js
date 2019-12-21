const
		{Client} = require('pg'),
		{configDB} = require('./config'),
		clientDB = new Client(configDB),
		{logs} = require('./../common/logs');

clientConnect = () => {
	clientDB.connect(error => {
		if (error) {
			process.env.NODE_ENV === 'prod' ? logs('Ошибка подключения к бд (200)', true) : console.error('Ошибка подключения к бд!');
		} else {
			if (process.env.NODE_ENV === 'prod') {
				logs('Соеденение с бд установлено!');
				console.log('Соеденение с бд установлено!');
			}
		}
	});
};

module.exports = {
	clientConnect,
	clientDB,
};