const parser = require('node-html-parser');

const COLUMN_NUMBER = 1;
const COLUMN_DOCS = 2;
const COLUMN_FLAGS = 3;
const COLUMN_TITLE = 4;
const COLUMN_STATUS = 5;
const COLUMN_VETO = 6;
const COLUMN_DATE = 7
const COLUMN_SPONSOR = 8;
const COLUMN_COMPANIONS = 9;

const parseRow = function parseRow(row) {
    const result = {};

    if(!row.getAttribute('data-leg-date')) {
        return null;
    }

    const columns = row.querySelectorAll('td');

    result.bill = columns[COLUMN_NUMBER].text.trim();
    result.docs = columns[COLUMN_DOCS].querySelectorAll('a')[0]?.getAttribute('href') ?? columns[COLUMN_DOCS].text.trim();
    result.flags = columns[COLUMN_FLAGS].text.trim();
    result.title = columns[COLUMN_TITLE].text.trim();
    result.status = columns[COLUMN_STATUS].text.trim();
    result.veto = columns[COLUMN_VETO].text.trim();
    result.date = columns[COLUMN_DATE].querySelectorAll('span')[0]?.text.trim().replace(/\//g, '-') ?? columns[COLUMN_DATE].text.trim();
    result.sponsor = columns[COLUMN_SPONSOR].querySelectorAll('a')[0]?.text.trim() ?? columns[COLUMN_SPONSOR].text.trim();
    result.companions = columns[COLUMN_COMPANIONS].text.trim();

    return result;
}

module.exports = function(content) {
    const document = parser.parse(content);

    const elements = document.querySelectorAll('tr').map(row => parseRow(row));

    return elements;

}