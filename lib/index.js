import * as errors from './const/errors.js'
import { EISDIR, ENOENT } from 'constants'
import fetch from 'node-fetch'
import { readFileSync } from 'fs'

const _linksRe = /(\[[^\s].*?\])(\(http.*?\))/g

const mdLinks = async (path, option) => {
  if (!path) {
    throw errors.noFile
  }

  try {
    const file = readFileSync(path, 'utf8')
    const validation = _validateFile(file, path)


    if (validation.hasError) {
      throw validation
    }

    return await _parseResult(file, option)
  } catch (err) {
    const error = _treatError(err)
    throw error.errorMessage
  }
}

const _treatError = (err, isError = true) => {
  const result = {
    errorMessage: '',
    error: isError
  }

  const errno = err.errno * -1
  switch (errno) {
    case EISDIR:
      result.errorMessage = errors.invalidDirectory
      break
    case ENOENT:
      result.errorMessage = errors.fileNotFound
      break
    default:
      result.errorMessage = err.message
      break
  }

  return result
}

const _validateFile = (data, path) => {
  const fileHasLinks = data ? data.match(_linksRe) : false
  const fileExtension = path.match(/\.[0-9a-z]+$/)[0]
  let result = { message: '', hasError: false }

  if (!fileHasLinks) {
    if (fileExtension != '.md') {
      result = {
        message: errors.invalidExtension,
        hasError: true
      }
    } else {
      result = {
        message: errors.inexistingLinks,
        hasError: true
      }
    }
  }

  return result
}

const _parseResult = (file, isToValidateLink) => {
  let result = file.match(_linksRe).map((el) => {
    const [rawHref, longText] = el.split('](')
    return {
      href: longText.slice(0, -1),
      text: rawHref.slice(1).substring(0, 50),
    }
  })

  if (isToValidateLink) {
    result = result.map(link => _getLinkStatus(link))
  }

  return Promise.all(result)
}

const _getLinkStatus = async (link) => {
  try {
    const resp = await fetch(link.href)
    return {
      ...link,
      status: resp.status
    }
  } catch (error) {
    return {
      ...link,
      status: error.code
    }
  }
}

export default mdLinks
