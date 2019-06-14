# at-template

[![Build Status](https://travis-ci.org/FujiHaruka/at-template.svg?branch=master)](https://travis-ci.org/FujiHaruka/at-template)
[![npm version](https://badge.fury.io/js/at-template.svg)](https://badge.fury.io/js/at-template)

JavaScript template engine with @{atSign} syntax.

## Usage

* `@{variable}` for string replacement
* `@@{variable}` for escaping

```js
const AtTemplate = require('at-template')
const template = AtTemplate.compile('Hello, my name is @{name}. I am from @{hometown}.')
const result = template({
  name: 'Fuji',
  hometown: 'Somewhere'
})

console.log(result)
// > Hello, my name is Fuji. I am from Somewhere

```

That's all.
