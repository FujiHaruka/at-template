const AtTemplate = require('at-template')
const template = AtTemplate.compile('Hello, my name is @{name}. I am from @{hometown}.')
const result = template({
  name: 'Fuji',
  hometown: 'Somewhere'
})

console.log(result)
// > Hello, my name is Fuji. I am from Somewhere
