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
    response.forEach((el) => {
      if (option) {
        console.log(chalk.blue(el.href), chalk.yellow(el.status), el.text);
      } else {
        console.log(chalk.blue(el.href), el.text);
      }
    });
  })
  .catch((err) => {
    console.log(chalk.red(err));
  });
