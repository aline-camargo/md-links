const fs = require('fs');
// const https = require('https');

const links = /(\[[^\s].*?\])(\(http.*?\))/g;
// const path = process.argv[2];
const sqBracket = /\[/;
const bracket = /\)/;

// falta: pegar todos os carcteres; statusCode;

const mdLinks = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(err);
    } else {
      const arr = data.match(links);
      const result = arr.map((el) => {
        const splited = el.split('](');
        const text = splited[0].replace(sqBracket, '');
        const href = splited[1].replace(bracket, '');
        // https.get(href, (resp) => {
        //     const status = resp.statusCode;
        // })
        return { href, text };
      });
      resolve(result);
    }
  });
});

module.exports = mdLinks;
