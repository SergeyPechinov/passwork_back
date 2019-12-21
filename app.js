const
		express = require('express'),
		app = express(),
		{clientConnect} = require('./database/client'),
		{logs} = require('./common/logs');

//CONNECT DB
clientConnect();

//START SERVER
app.listen(process.env.NODE_APP_PORT, (error) => {
	if (error) {
		process.env.NODE_ENV === 'prod' ? logs('Ошибка запуска сервера (100)', true) : null;
		return console.error(`Ошибка ${error}`);
	} else {
		console.log(`Сервер запущен на '${process.env.NODE_APP_PORT}' порту!`);
		process.env.NODE_ENV === 'prod' ? logs(`Сервер запущен на ${process.env.NODE_APP_PORT} порту!`) : null;
	}
});