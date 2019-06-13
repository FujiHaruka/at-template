'use strict'

const GLOBAL_PATTERN = /@+{ *[A-Za-z0-9_$]+ *}/g
const CAPTURE_PATTERN = /(@+){ *([A-Za-z0-9_$]+) *}/
const ESCAPED_NAME_SYMBOL = Symbol('escaped name')
const Types = {
  STR: 'string',
  NUM: 'number',
  UNDEF: 'undefined'
}

const engageGears = (arr1, arr2) =>
  arr1.flatMap((item, index) => [item, arr2[index]])

const AtTemplate = {
  compile(text) {
    const embededStrings = text.match(GLOBAL_PATTERN)
    const embededVars = embededStrings.map((str, index) => {
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
        if (type === Types.UNDEF) {
          throw new Error(`Not found data "${name}" for template data`)
        }
        if (type !== Types.STR && type !== Types.NUM) {
          throw new Error(`Data "${name}" is invalid type. Expected string or number, but given: ${type}`)
        }
        return data[name]
      })
      return engageGears(punchedStrings, enbededValues).join('')
    }
    return template
  },
}

module.exports = AtTemplate
