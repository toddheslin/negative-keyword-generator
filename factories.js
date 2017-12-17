module.exports = {
	splitCsvFactory: headers => line => column =>
		line.split(',')[headers.indexOf(column)].trim(),

	negativeKeywordsFactory: keywordsList => adgroup =>
		keywordsList.filter(kw => kw !== adgroup).filter(kw => kw.includes(adgroup))
}
