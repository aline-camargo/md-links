const fs = require('fs');
// const https = require('https');

const links = /(\[[^\s].*?\])(\(http.*?\))/g;
const bracket = /\)|\[/;

// falta: statusCode;

const mdLinks = path => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err || !data.match(links)) {
      const erro = `Erro: ${err}`;
      reject(erro);
    } else {
      const arr = data.match(links);
      const result = arr.map((el) => {
        const splited = el.split('](');
        const text = splited[0].replace(bracket, '');
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
