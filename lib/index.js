const fs = require('fs');
const fetch = require('node-fetch');

const links = /(\[[^\s].*?\])(\(http.*?\))/g;

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err || !data.match(links)) {
      const erro = (err == null) ? 'Erro: arquivo não contém links.'
        : 'Erro: arquivo não encontrado, path incorreto.';
      reject(erro);
    } else {
      const result = data.match(links).map((el) => {
        const splited = el.split('](');
        return {
          href: splited[1].slice(0, -1),
          text: splited[0].slice(1),
        };
      });
      if (option) {
        Promise.all(result.map(element => fetch(element.href)
          .then((resp) => {
            const object = element;
            object.status = resp.status;
          })
          .catch((error) => {
            const object = element;
            object.status = error.code;
          })))
          .then(() => resolve(result));
      } else {
        resolve(result);
      }
    }
  });
});

module.exports = mdLinks;
