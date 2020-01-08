const
		{tablesNames} = require('../../constant/tablesNames.js'),
		{clientDB} = require('./../../database/client'),
		{generateFull} = require('../../common/jwt/generateJWT'),
		{logs} = require('./../../common/logs'),
		{validatorEmail} = require('./../../common/validators');

//создание токенов
const addTokenInTokens = (token, tokens) => {
	//создаем массив если, пользователь не авторизован, если авторизован то только добавляем
	if (tokens) {
		let tokensCopy = JSON.parse(tokens);
		tokensCopy.push(token);
		return JSON.stringify(tokensCopy);
	} else {
		let tokensMass = [];
		tokensMass.push(token);
		return JSON.stringify(tokensMass);
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

const authorizationQuery = (res, email, password) => {
	const query = `\
					SELECT\
						*\
					FROM\
						${tablesNames.users}\
					WHERE
						email='${email}' AND password_master='${password}';`;

	clientDB.query(query, (error, result) => {
		if (error) {
			process.env.NODE_ENV === 'prod' ? logs(`Ошибка подключения к бд (${email}) (2001)`, true) : console.log(`Ошибка подключения к бд (${email}) (2001)`);
			res.status(400).json({success: false, message: 'Ошибка отправки формы!'});
		} else {
			if (result.rows.length === 0) {
				process.env.NODE_ENV === 'prod' ? logs(`Ошибка авторизации (не правильный логин или пароль) (${email}) (401)`, true) : console.log(`Ошибка авторизации (не правильный логин или пароль) (${email}) (401)`);
				res.status(401).json({success: false, message: 'Не правильный логин или пароль!'});
			} else {
				const tokenFull = generateFull(email);
				const jwtTokens = addTokenInTokens(tokenFull, result.rows[0].tokens);
				inputTokenInDataBase(jwtTokens, email, password);
				process.env.NODE_ENV === 'prod' ? logs(`Пользователь '${email}' авторизован`, true) : null;
				res.status(200).json({success: true, tokenFull});
			}
		}
	});
};

module.exports = (req, res) => {
	const
			email = req.body.email,
			password = req.body.password;

	console.log(email, password);

	console.log(validatorEmail(email));
	const emailValidate = validatorEmail(email);

	if (emailValidate && password.length >= 8) {
		authorizationQuery(res, email, password);
	} else {
		res.status(400).json({
			success: false,
			messages: {
				email: emailValidate ? '' : 'Не верно заполнен email',
				password: password.length >= 8 ? '' : 'Минимум 8 символов',
			},
		})
	}
};