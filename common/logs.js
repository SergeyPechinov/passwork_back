const
		fs = require('fs'),
		dir = './logs',
		{dateDMY, dateFull} = require('./date');

logs = (text, error = false) => {
	const
			dirFile = `${dir}/logs_${dateDMY}_${process.env.NODE_ENV === 'prod' ? 'prod' : 'dev'}.log`,
			textResult = `${dateFull}${error ? `          ERROR` : ''}          ${text}`;

	fs.access(dir, error => {
		//создание папки если ее нет
		if (error) {
			fs.mkdir(dir, () => {
				//запись в файл на псоледнию строчку или создание файла если его нет
				fs.appendFileSync(dirFile, `${textResult}`);
			});
		} else {
			fs.appendFileSync(dirFile, `\n${textResult}`);
		}
	});
};

module.exports = {
	logs: logs,
};