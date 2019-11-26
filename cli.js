#!/usr/bin/env node
const chalk = require('chalk');
const mdLinks = require('./lib/index.js');

const path = process.argv[2];

mdLinks(path)
  .then((response) => {
    response.forEach((el) => {
      console.log(chalk.blue(el.href), el.text);
    });
  })
  .catch((err) => {
    console.log(chalk.red(err));
  });
