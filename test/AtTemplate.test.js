'use strict'

const assert = require('assert').strict
const { compile } = require('../lib/AtTemplate')

describe('AtTemplate', () => {
  it('works 01', () => {
    const text = ' xx @{a} @{ b } xx@{c}@{c  }xx xx @@{escaped}@{a}'
    const template = compile(text)

    const res = template({
      a: '#',
      b: '$',
      c: 1,
      d: '!', // Unnecessary value is ok
    })
    assert.equal(res, ' xx # $ xx11xx xx @{escaped}#')
  })

  it('works 02', () => {
    const text = ''
    const template = compile(text)
    template({})
  })

  it('throws if invalid', () => {
    const text = ' xx @{a} @{ b } xx@{c}@{c}xx xx @@{escaped}@{a}'
    const template = compile(text)

    assert.throws(() =>
      template({
        a: '#',
        b: '$',
        // c: '%', // required
      }),
    )
    assert.throws(() =>
      template({
        a: '#',
        b: '$',
        c: {}, // must be string or number
      }),
    )
  })

  it('works with a large text', () => {
    const count = 100
    const text = new Array(count)
      .fill(null)
      .map(() => '@{value}')
      .join('#')
    const expected = new Array(count)
      .fill(null)
      .map(() => 'xxxxxxxxxxxxxxxx')
      .join('#')

    console.time('time')
    const template = compile(text)
    const res = template({ value: 'xxxxxxxxxxxxxxxx' })
    console.timeEnd('time')

    assert.equal(res, expected)
  })
})
