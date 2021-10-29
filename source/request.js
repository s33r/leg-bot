const http = require('https');


module.exports = function(url) {
    return new Promise((resolve, reject) => {
        http.get(url, response => {
            let rawData = '';
    
            response.on('data', (chunk) => { rawData += chunk; });
    
            response.on('end', () => {
                try {
                    resolve(rawData);
                } catch (e) {
                    console.error(e.message);
                    reject(e);
                }
            });
        });
    });
}