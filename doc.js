const fs = require('fs')
const AtTemplate = require('./lib/AtTemplate')

const readmeTemplate = fs.readFileSync('.README.md.template', 'utf-8')
const reademData = {
  code: fs.readFileSync('./example/example.js', 'utf-8')
}

const template = AtTemplate.compile(readmeTemplate)
const readme = template(reademData)
fs.writeFileSync('README.md', readme)
