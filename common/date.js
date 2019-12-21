///////////////////////////////////////////////////////////
//***Тут меняется прдставление некоторых дат с 1 на 01***//
///////////////////////////////////////////////////////////

const
		date = new Date(),

		year = date.getFullYear(),
		day = String(date.getDate()).length === 1 ? `0${date.getDate()}` : date.getDate(),
		month = String(date.getMonth()).length === 1 ? `0${date.getMonth()}` : date.getMonth(),
		hours = String(date.getHours()).length === 1 ? `0${date.getHours()}` : date.getHours(),
		minutes = String(date.getMinutes()).length === 1 ? `0${date.getMinutes()}` : date.getMinutes(),
		seconds = String(date.getSeconds()).length === 1 ? `0${date.getSeconds()}` : date.getSeconds(),

		dateDMY = `${day}.${month}.${year}`,
		dateHMS = `${hours}:${minutes}:${seconds}`,
		dateFull = `${dateDMY} ${dateHMS}`;

module.exports = {
	date: {
		day,
		month,
		year,
		hours,
		minutes,
		seconds,
	},
	dateDMY,
	dateHMS,
	dateFull,
};