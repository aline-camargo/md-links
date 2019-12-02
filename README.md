# Markdown Links

> Biblioteca que oferece uma CLI (Command Line Interface - Interface de Linha de Comando) para ler arquivos .md e retornar uma lista dos links contidos no mesmo.

## Utilizando
### Como instalar

    $ npm install -g aline-camargo/SAP003-md-links

### Como usar

    $ md-links caminho/do/arquivo.md

Para verificar a validade dos links escreva:

    $ md-links <caminho-do-arquivo> -v

ou

    $ md-links <caminho-do-arquivo>  --validate

### Retorno esperado


```console
$ md-links ./algum/exemplo.md
http://algo.com/2/3/ Link de algo
https://outra-coisa-.net/algum-doc.html algum doc
http://google.com/ Google
```
ou

```console
$ md-links ./algum/exemplo.md --validate
http://algo.com/2/3/ 200 Link de algo
https://outra-coisa-.net/algum-doc.html 404 algum doc
http://google.com/ 301 Google
```

## Considerações gerais

### Arquivos do Projeto


* `README.md`
* `package.json` possuindo o nome, versão, descrição, autor, licença,
  dependências e scripts (eslint e test).
* `package-lock.json` arquivo gerado pelo npm, para controle dos pacotes instalados
* `.eslintrc` com a configuração para o linter.
* `.gitignore` para ignorar o `node_modules` e outras pastas que não devem ser incluídas no controle de versão (`git`).
* `cli.js` arquivo que chama a função `mdLinks` que será executada pela linha de comando.
* `lib/index.js` criação e exportação da função `mdLinks`.
* `lib/__tests__/index.spec.js` contém testes unitários para a função `mdLinks`.