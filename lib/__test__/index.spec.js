const mdLinks = require('../index.js');

const okResult = [{ href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown' },
  { href: 'https://nodejs.org/api/fs.html', text: 'fs' },
  { href: 'https://nodejs.org/api/path.html', text: 'path' },
  { href: 'https://docs.npmjs.com/files/package.json', text: 'package.json' },
  { href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html', text: '(CommonJS)' }];

describe('Testando mdLinks', () => {
  test('É uma função', () => {
    expect(typeof mdLinks).toBe('function');
  });

  test('Retorna array com objetos quando passado arquivo .md válido contendo links', (done) => {
    mdLinks('lib/__test__/__mocks__/teste-com-links.md')
      .then((response) => {
        expect(response).toEqual(okResult);
        done();
      });
  });

  test('Retorna erro quando passado arquivo .md válido não contendo links', (done) => {
    mdLinks('lib/__test__/__mocks__/teste-sem-links.md')
      .catch((response) => {
        expect(response).toEqual('Erro: arquivo não contém links.');
        done();
      });
  });

  test('Retorna erro quando passado arquivo .md inválido', (done) => {
    mdLinks('lib/__test__/__mocks__/teste.md')
      .catch((response) => {
        expect(response).toEqual('Erro: arquivo não encontrado, path incorreto.');
        done();
      });
  });
});
