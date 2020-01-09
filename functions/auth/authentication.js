const
		{tablesNames} = require('../../constant/tablesNames.js'),
		{clientDB} = require('./../../database/client'),
		{verifyJWT} = require('../../common/jwt/jwt'),
		{generateFull} = require('../../common/jwt/generateJWT'),
		{logs} = require('./../../common/logs');

const updateToken = (email, tokens, tokenFull, res) => {
	const query = `\
        UPDATE\
          ${tablesNames.users}\
        SET\
          tokens='${JSON.stringify(tokens)}'\
        WHERE (\
          email='${email}'\
        )`;

	clientDB.query(query, error => {
		if (error) {
			console.log(error);
		} else {
			res.status(200).json({
				success: false,
				verifyAccess: false,
				verifyRefresh: true,
				tokenFull,
			});
		}
	});
};

module.exports = (req, res, next) => {
	const
			email = req.body.email,
			token = req.headers.authorization;

	const query = `\
				  SELECT\
				    tokens, email\
			    FROM\
			      ${tablesNames.users}\
		      WHERE\
		        email='${email}'`;

	clientDB.query(query, (error, result) => {
		if (error) {
			process.env.NODE_ENV === 'prod' ? logs(`Ошибка подключения к бд (2002)`, true) : console.log(`Ошибка подключения к бд (2002)`);
		} else {
			if (result.rows.length === 0) {
				if (process.env.NODE_ENV === 'dev') {
					console.log('Пользователь не найден!');
				}
				res.status(401).json({
					success: false,
				});
			} else {
				const tokens = JSON.parse(result.rows[0].tokens);
				const tokensLength = tokens.length;

				//проверка существования токена
				for (let i = 0; i < tokensLength; i++) {
					const itemTokenAccess = tokens[i].access;
					if (itemTokenAccess === token) {
						const verifyTokenAccess = verifyJWT(itemTokenAccess);

						//если токен существует проверяем на валидность
						if (typeof verifyTokenAccess === 'object') {
							next();
						} else {
							const itemTokenRefresh = tokens[i].refresh;
							const verifyTokenRefresh = verifyJWT(itemTokenRefresh);

							//если токен не валиден, проверверяем рефреш токен
							if (typeof verifyTokenRefresh === 'object') {
								const tokenFull = generateFull(result.rows[0].email);

								tokens[i].access = tokenFull.access;
								tokens[i].refresh = tokenFull.refresh;

								updateToken(email, tokens, tokenFull, res);
							} else {
								process.env.NODE_ENV === 'prod' ? logs(`Рефреш токен не валиден 'email: ${email}' (404)`, true) : console.log(`Рефреш токен не валиден'email: ${email}' (404)`);
								res.status(401).json({
									success: false,
									verifyAccess: false,
									verifyRefresh: false,
								});
							}
						}
						break;
					} else {
						if (i === tokensLength - 1) {
							process.env.NODE_ENV === 'prod' ? logs(`Токен в бд не существует 'email: ${email}' (403)`, true) : console.log(`Токен в бд не существует 'email: ${email}' (403)`);
							res.status(401).json({success: false, message: 'Токен в бд не существует'});
						}
					}
				}
			}
		}
	});
};