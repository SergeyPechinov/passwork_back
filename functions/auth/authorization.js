const
		{tablesNames} = require('../../constant/tablesNames.js'),
		{clientDB} = require('./../../database/client'),
		{generateJWT} = require('./common'),
		{logs} = require('./../../common/logs');

//создание токенов
const addTokenInTokens = (tokens, email) => {
	const jwt = {
		access: generateJWT(email, 60 * 60),
		refresh: generateJWT(email, 60 * 60 * 24 * 30),
	};

	//создаем массив если, пользователь не авторизован, если авторизован то только добавляем
	if (tokens) {
		let tokensCopy = JSON.parse(tokens);
		tokensCopy.push(jwt);
		return JSON.stringify(tokensCopy);
	} else {
		let jwtJSON = [];
		jwtJSON.push(jwt);
		return JSON.stringify(jwtJSON);
	}
};

//добавляет токен в базу
const inputTokenInDataBase = (tokens, email, password) => {
	const query = `\
        UPDATE\
          ${tablesNames.users}\
        SET\
          tokens='${tokens}'\
        WHERE (\
          email='${email}'\
        AND\
          password_master='${password}'\
        )`;

	clientDB.query(query, error => {
		if (error) {
			process.env.NODE_ENV === 'prod' ? logs(`Ошибка добавления токена в базу данных (${email}) (300)`, true) : console.log(`Ошибка добавления токена в базу данных (${email}) (300)`);
		}
	});
};

module.exports = (req, res) => {
	const
			email = req.body.email,
			password = req.body.password;

	const query = `\
					SELECT\
						*\
					FROM\
						${tablesNames.users}\
					WHERE
						email='${email}' AND password_master='${password}';`;

	clientDB.query(query, (error, result) => {
		if (error) {
			process.env.NODE_ENV === 'prod' ? logs(`Ошибка авторизации (${email}) (400)`, true) : console.log(`Ошибка авторизации(${email}) (400)`);
			res.status(400).json({success: false});
		} else {
			if (result.rows.length === 0) {
				process.env.NODE_ENV === 'prod' ? logs(`Ошибка авторизации (не правильный логин или пароль) (${email}) (401)`, true) : console.log(`Ошибка авторизации (не правильный логин или пароль) (${email}) (401)`);
				res.status(401).json({success: false});
			} else {
				const jwtTokens = addTokenInTokens(result.rows[0].tokens, email);
				inputTokenInDataBase(jwtTokens, email, password);
				process.env.NODE_ENV === 'prod' ? logs(`Пользователь '${email}' авторизован`, true) : null;
				res.status(200).json({success: true});
			}
		}
	});
};