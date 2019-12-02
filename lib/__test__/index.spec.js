const mdLinks = require('../index.js');

describe('Testando mdLinks', () => {
  test('É uma função', () => {
    expect(typeof mdLinks).toBe('function');
  });

  test('Retorna array com objetos quando passado arquivo .md válido contendo links', (done) => {
    const okResultNoValidate = [{ href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown' },
      { href: 'https://pt.wikiihfwierhpedia.org/wiki/Markdown', text: 'Err' },
      { href: 'https://www.google.com/404', text: 'Not found' },
      { href: 'https://nodejs.org/api/fs.html', text: 'fs' },
      { href: 'https://nodejs.org/api/path.html', text: 'path' },
      { href: 'https://docs.npmjs.com/files/package.json', text: 'package.json' },
      { href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html', text: '(CommonJS)' }];

    mdLinks('lib/__test__/__mocks__/teste-com-links.md')
      .then((response) => {
        expect(response).toMatchObject(okResultNoValidate);
        done();
      });
  });

  test('Retorna erro quando passado arquivo .md válido não contendo links', (done) => {
    mdLinks('lib/__test__/__mocks__/teste-sem-links.md')
      .catch((response) => {
        expect(response).toMatch('Erro: arquivo não contém links.');
        done();
      });
  });

  test('Retorna erro quando passado arquivo .md inválido', (done) => {
    mdLinks('lib/__test__/__mocks__/teste.md')
      .catch((response) => {
        expect(response).toMatch('Erro: arquivo não encontrado, path incorreto.');
        done();
      });
  });

  test('Retorna links e status code quando passado argumento --validate', (done) => {
    const okResultValidate = [{ href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', status: 200 },
      { href: 'https://pt.wikiihfwierhpedia.org/wiki/Markdown', text: 'Err', status: 'ENOTFOUND' },
      { href: 'https://www.google.com/404', text: 'Not found', status: 404 },
      { href: 'https://nodejs.org/api/fs.html', text: 'fs', status: 200 },
      { href: 'https://nodejs.org/api/path.html', text: 'path', status: 200 },
      { href: 'https://docs.npmjs.com/files/package.json', text: 'package.json', status: 200 },
      { href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html', text: '(CommonJS)', status: 200 }];

    mdLinks('lib/__test__/__mocks__/teste-com-links.md', true)
      .then((response) => {
        expect(response).toMatchObject(okResultValidate);
        done();
      });
  });
});
