'use strict'

const assert = require('assert').strict

const GLOBAL_PATTERN = /@+{ *[A-Za-z0-9_$]+ *}/g
const CAPTURE_PATTERN = /(@+){ *([A-Za-z0-9_$]+) *}/
const ESCAPED_NAME_SYMBOL = Symbol('escaped name')
const Types = {
  STR: 'string',
  NUM: 'number',
  UNDEF: 'undefined',
}

const engageGears = (arr1, arr2) =>
  arr1
    .map((item, index) => [item, arr2[index]])
    .reduce((arr, pair) => arr.concat(pair), [])

const AtTemplate = {
  compile(text) {
    assert.equal(typeof text, Types.STR, 'compile() arg must be string')
    const embededStrings = text.match(GLOBAL_PATTERN)
    if (!embededStrings) {
      // 変数パターンがないので noop
      const template = () => {
        return text
      }
      return template
    }
    const embededVars = embededStrings.map((str) => {
      const [_, atSigns, name] = str.match(CAPTURE_PATTERN)
      const isEscaped = atSigns.length > 1
      if (isEscaped) {
        return [
          ESCAPED_NAME_SYMBOL,
          str.slice(1), // delete head '@'
        ]
      }
      return [name]
    })
    const punchedStrings = text.split(GLOBAL_PATTERN)

    const template = (data) => {
      const enbededValues = embededVars.map(([name, value]) => {
        if (name === ESCAPED_NAME_SYMBOL) {
          return value
        }
        const type = typeof data[name]
        assert.notEqual(
          type,
          Types.UNDEF,
          `Key "${name}" must be contained in template data`,
        )
        assert.ok(
          type === Types.STR || type === Types.NUM,
          `Value of key "${name}" is invalid type. Expected string or number, but given: ${type}`,
        )
        return data[name]
      })
      return engageGears(punchedStrings, enbededValues).join('')
    }
    return template
  },
}

module.exports = AtTemplate
