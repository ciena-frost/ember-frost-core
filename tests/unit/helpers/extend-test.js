/**
 * Unit test for extend helper
 */
import {expect} from 'chai'
import {beforeEach, describe, it} from 'mocha'

import {extend} from 'ember-frost-core/helpers/extend'

describe('Unit / Helper / extend', function () {
  let original, result
  beforeEach(function () {
    original = {
      bar: 'baz',
      baz: 'foo',
      foo: 'bar'
    }

    result = extend([original], {fizz: 'bang'})
  })

  it('should not change the original object', function () {
    expect(original).to.eql({
      bar: 'baz',
      baz: 'foo',
      foo: 'bar'
    })
  })

  it('should incorporate the new properites', function () {
    expect(result).to.eql({
      bar: 'baz',
      baz: 'foo',
      fizz: 'bang',
      foo: 'bar'
    })
  })
})
