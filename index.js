const { splitCsvFactory, negativeKeywordsFactory } = require('./factories')

//////////////////	SETUP	/////////////////////////

// Import the CSV
const adwordsCsvArray = Array.from(
	require('fs')
		.readFileSync('keywords.csv', 'utf8')
		.split('\r\n')
)
// Create a split line function from its factory with the headers for this file
const splitCsvLine = splitCsvFactory(['campaign', 'adgroup'])
// Create an array of keywords based on the adgroup names (SKWAGs)
const keywords = adwordsCsvArray.map(row => splitCsvLine(row)('adgroup'))
// Create a negative keywords function from its factory with all keywords
// Takes an inital list of keywords, and the function is called with a seed keyword
const negativeKeywordsGenerator = negativeKeywordsFactory(keywords)

/////////////////////////////////////////////////////

// Main function called by the fs.writeFile() function
const generateCsv = csvInput =>
	csvInput.reduce(
		(negativeCsvList, adgroup) =>
			// the createNegativeKeywords function is called for each row in the CSV
			negativeCsvList.concat(
				createNegativeKeywords(
					splitCsvLine(adgroup)('campaign'),
					splitCsvLine(adgroup)('adgroup'),
					negativeKeywordsGenerator(splitCsvLine(adgroup)('adgroup'))
				)
			),
		'Campaign, Ad Group, Keyword, Type\n'
	)

function createNegativeKeywords(campaign, adgroup, negativeKeywordsList) {
	if (negativeKeywordsList.length <= 0) return ''

	return negativeKeywordsList.reduce((line, keyword) => {
		// return a CSV row for each negative keyword using 'Negative Phrase'
		return line.concat(
			`${campaign},${adgroup},${keyword.toString().trim()},Negative Phrase\n`
		)
	}, '')
}

/*
* Write the CSV file to the directory
*/
require('fs').writeFile(
	'negative-keywords.csv',
	generateCsv(adwordsCsvArray),
	'utf8',
	err => {
		if (err) throw err
		console.log('Your negative keywords have been processed!')
	}
)
