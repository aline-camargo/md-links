const fs = require('fs');
const fetch = require('node-fetch');

const links = /(\[[^\s].*?\])(\(http.*?\))/g;

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
        const text = splited[0].slice(1);
        const href = splited[1].slice(0, -1);
        return { href, text };
      });
      if (option) {
        const promises = result.map(element => fetch(element.href).then((resp) => {
          const object = element;
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
