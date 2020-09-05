const fs = require('fs')
const fetch = require('node-fetch')

const links = /(\[[^\s].*?\])(\(http.*?\))/g

const mdLinks = (path, option) => new Promise((resolve, reject) => {
  if (!path) {
    reject('Nenhum arquivo fornecido, nenhum arquivo analisado.')
  }
  fs.readFile(path, 'utf8', (err, data) => {
    const validation = _validateFile(err, data, path)
    if (!validation.error) {
      const result = data.match(links).map((el) => {
        const [rawHref, longText] = el.split('](')
        return {
          href: longText.slice(0, -1),
          text: rawHref.slice(1).substring(0, 50),
        }
      })
      if (option) {
        Promise.all(
          result.map(element => fetch(element.href)
            .then((resp) => {
              const object = element
              object.status = resp.status
            })
            .catch((error) => {
              const object = element
              object.status = error.code
            })),
        ).then(() => resolve(result))
      } else {
        resolve(result)
      }
    } else {
      reject(validation.errorMessage)
    }
  })
})

const _validateFile = (err, data, path) => {
  const fileHasLinks = data ? data.match(links) : false
  const fileExtension = path.match(/\.[0-9a-z]+$/)

  if (err) {
    let errorMessage = ''
    if (err.code == Errors.EISDIR) {
      errorMessage = 'Erro: ação inválida, forneça um arquivo ao invés de um diretório.'
    } else if (err.code == Errors.ENOENT) {
      errorMessage = 'Erro: arquivo não encontrado.'
    }
    return { errorMessage, error: true }
  } if (!fileHasLinks) {
    let errorMessage = ''
    if (fileExtension[0] != '.md') {
      errorMessage = 'Erro: forneça um arquivo de extensão .md'
    } else {
      errorMessage = 'Arquivo não contém links.'
    }
    return { errorMessage, error: true }
  }
  return { errorMessage: '', error: false }
}

const Errors = {
  ENOENT: 'ENOENT',
  EISDIR: 'EISDIR',
}

module.exports = mdLinks
