const fs = require('fs-extra');

const request = require('./request.js');
const parse = require('./parse.js');

const TEST_MODE = true;


const url = 'https://app.leg.wa.gov/bi/report/billstatus/?biennium=2021-22&allBills=true&startBillNumber=&endBillNumber=';
const testPath = "./test/test.html";





module.exports = async function() {
    const content = TEST_MODE 
        ? fs.readFileSync(testPath, 'utf-8') 
        : await request(url);

    const parsedContent = parse(content);


    console.log(parsedContent);
    //fs.writeFileSync('./test.txt', JSON.stringify(parsedContent));
};