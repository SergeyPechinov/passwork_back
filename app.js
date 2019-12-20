const
		express = require('express'),
		app = express();

console.log(process.env.NODE_ENV);

//START SERVER
const server = app.listen(process.env.NODE_APP_PORT, (error) => {
	if (error)
		return console.log(`Error ${error}`);
	else {
		console.log(`Server start in '${process.env.NODE_APP_PORT}' port!`);
	}
});