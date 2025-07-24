const fs = require('fs')

const data = fs.readFileSync('./recettes.json', 'utf-8')
const jsonData = JSON.parse(data); // Parse le JSON
console.log(jsonData.length);