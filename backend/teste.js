const fs = require('fs')

const data = fs.readFileSync('./recettes.json', 'utf-8')
console.log(data.recettes.length)