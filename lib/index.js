const fs = require('fs');
const fetch = require('node-fetch');

const links = /(\[[^\s].*?\])(\(http.*?\))/g;
const bracket = /\)|\[/;

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err || !data.match(links)) {
      let erro = '';
      if (err == null) {
        erro = 'Erro: arquivo não contém links.';
      } else {
        erro = 'Erro: arquivo não encontrado, path incorreto.';
      }
      reject(erro);
    } else {
      const arr = data.match(links);
      const result = arr.map((el) => {
        const splited = el.split('](');
        const text = splited[0].replace(bracket, '');
        const href = splited[1].replace(bracket, '');
        return { href, text };
      });
      if (option) {
        const promises = result.map(el => fetch(el.href).then((resp) => {
          const object = el;
          object.status = resp.status;
        }));
        Promise.all(promises).then(() => resolve(result));
      } else {
        resolve(result);
      }
    }
  });
});

module.exports = mdLinks;
