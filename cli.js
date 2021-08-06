#!/usr/bin/env node
import chalk from 'chalk'
import yargs from 'yargs'
import mdLinks from './lib/index.js'

const argv = yargs().command('md-links', 'Busca links em arquivos .md')
  .option('validate', {
    alias: 'v',
    description: 'Retorna o código de status da requisição do link',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .argv

const option = argv.validate
const path = process.argv[2]

async function init() {
  try {
    const response = await mdLinks(path, option)

    response.forEach((element) => {
      if (option) {
        console.info(chalk.cyan(element.href), chalk.yellow(element.status), element.text)
      } else {
        console.info(chalk.cyan(element.href), element.text)
      }
    })
  } catch(err) {
    console.error(chalk.red(`Erro: ${err}`))
  }
}

init()
