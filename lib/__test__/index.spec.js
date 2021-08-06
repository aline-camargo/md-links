import * as errors from '../const/errors.js'
import mdLinks from '../index.js'

describe('Testando mdLinks', () => {
  test('É uma função', () => {
    expect(typeof mdLinks).toBe('function')
  })

  test('Retorna array com objetos quando passado arquivo .md válido contendo links', async () => {
    const okResultNoValidate = [
      { href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown' },
      { href: 'https://pt.wikiihfwierhpedia.org/wiki/Markdown', text: 'Err' },
      { href: 'https://www.google.com/404', text: 'Not found' },
      { href: 'https://nodejs.org/api/fs.html', text: 'fs' },
      { href: 'https://nodejs.org/api/path.html', text: 'path' },
      { href: 'https://docs.npmjs.com/files/package.json', text: 'package.json' },
      { href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html', text: '(CommonJS)' }
    ]

    const result = await mdLinks('lib/__test__/__mocks__/teste-com-links.md')
    expect(result).toMatchObject(okResultNoValidate)
  })

  test('Retorna erro quando passado arquivo .md válido não contendo links', async () => {
    try {
      await mdLinks('lib/__test__/__mocks__/teste-sem-links.md')
    } catch (err) {
      expect(err).toMatch(errors.inexistingLinks)
    }
  })

  test('Retorna erro quando passado arquivo .md inválido', async () => {
    try {
      await mdLinks('lib/__test__/__mocks__/teste.md')
    } catch (err) {
      expect(err).toMatch(errors.fileNotFound)
    }
  })

  test('Retorna erro quando não passado nenhum arquivo', async () => {
    try {
      await mdLinks()
    } catch (err) {
      expect(err).toMatch(errors.noFile)
    }
  })

  test('Retorna erro quando passado um diretório', (done) => {
    mdLinks('lib/__test__/__mocks__')
      .catch((response) => {
        expect(response).toMatch(errors.invalidDirectory)
        done()
      })
  })

  test('Retorna erro quando passado um arquivo de extensão diferente de .md', async () => {
    try {
      await mdLinks('lib/__test__/index.spec.js')
    } catch (err) {
      expect(err).toMatch(errors.invalidExtension)
    }
  })

  test('Retorna links e status code quando passado argumento --validate', async () => {
    const okResultValidate = [
      { href: 'https://pt.wikipedia.org/wiki/Markdown', text: 'Markdown', status: 200 },
      { href: 'https://pt.wikiihfwierhpedia.org/wiki/Markdown', text: 'Err', status: 'ENOTFOUND' },
      { href: 'https://www.google.com/404', text: 'Not found', status: 404 },
      { href: 'https://nodejs.org/api/fs.html', text: 'fs', status: 200 },
      { href: 'https://nodejs.org/api/path.html', text: 'path', status: 200 },
      { href: 'https://docs.npmjs.com/files/package.json', text: 'package.json', status: 200 },
      { href: 'https://nodejs.org/docs/latest-v0.10.x/api/modules.html', text: '(CommonJS)', status: 200 }
    ]

    const result = await mdLinks('lib/__test__/__mocks__/teste-com-links.md', true)
    expect(result).toMatchObject(okResultValidate)
  })
})
