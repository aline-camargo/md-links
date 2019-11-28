#!/usr/bin/env node
const chalk = require('chalk');
const mdLinks = require('./lib/index.js');

const option = process.argv[3];
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
