const
		{tablesNames} = require('../../constant/tablesNames.js'),
		{clientDB} = require('./../../database/client'),
		{verifyJWT} = require('../../common/jwt/jwt'),
		{logs} = require('./../../common/logs');

module.exports = (req, res, next) => {
	const
			id = req.body.id,
			token = req.headers.authorization;

	const query = `\
				  SELECT\
				    tokens\
			    FROM\
			      ${tablesNames.users}\
		      WHERE\
		        id='${id}'`;

	clientDB.query(query, (error, result) => {
		if (error) {
			process.env.NODE_ENV === 'prod' ? logs(`Ошибка подключения к бд (2002)`, true) : console.log(`Ошибка подключения к бд (2002)`);
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
							next();
						} else {
							process.env.NODE_ENV === 'prod' ? logs(`Рефреш токен не валиден 'id: ${id}' (404)`, true) : console.log(`Рефреш токен не валиден'id: ${id}' (404)`);
							res.status(401).json({success: false});
						}
					}
					break;
				} else {
					if (i === tokensLength - 1) {
						process.env.NODE_ENV === 'prod' ? logs(`Токен в бд не существует 'id: ${id}' (403)`, true) : console.log(`Токен в бд не существует 'id: ${id}' (403)`);
						res.status(401).json({success: false});
					}
				}
			}
		}
	});
};