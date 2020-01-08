const
		express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		{clientConnect} = require('./database/client'),
		{logs} = require('./common/logs'),
		cors = require('cors');

//CORS
app.use(cors());

//CONNECT DB
clientConnect();

//CREATE TABLES
const createTableUsers = require('./database/tables/createTableUsers');
createTableUsers();

//BODY PARSER
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// ROUTERS
app.use(require('./routers/index'));

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