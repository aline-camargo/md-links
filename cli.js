#!/usr/bin/env node
const chalk = require('chalk');
const yargs = require('yargs');
const mdLinks = require('./lib/index.js');

const argv = yargs
  .command('md-links', 'Busca links em arquivos .md')
  .option('validate', {
    alias: 'v',
    description: 'Retorna o código de status da requisição do link',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .argv;

const option = argv.validate;
const path = process.argv[2];

mdLinks(path, option)
  .then((response) => {
    response.forEach((element) => {
      if (option) {
        console.log(chalk.blue(element.href), chalk.yellow(element.status), element.text);
      } else {
        console.log(chalk.blue(element.href), element.text);
      }
    });
  })
  .catch((err) => {
    console.log(chalk.red(err));
  });
