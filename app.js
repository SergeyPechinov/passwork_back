const
		express = require('express'),
		app = express(),
		{clientConnect} = require('./database/client'),
		{logs} = require('./common/logs');

const createTableUsers = require('./database/tables/createTableUsers');
createTableUsers();
// const createTableStructureFolder = require('./database/tables/createTableStructureFolder.js');
// createTableStructureFolder(12);

//CONNECT DB
clientConnect();

//START SERVER
app.listen(process.env.NODE_APP_PORT, (error) => {
	if (error) {
		process.env.NODE_ENV === 'prod' ? logs('Ошибка запуска сервера (100)', true) : console.error(error);
		return false;
	} else {
		console.log(`Сервер запущен на '${process.env.NODE_APP_PORT}' порту!`);
		process.env.NODE_ENV === 'prod' ? logs(`Сервер запущен на ${process.env.NODE_APP_PORT} порту!`) : null;
	}
});