import {expect} from 'chai'
import {array} from 'ember-frost-core/helpers/array'
import {describe, it} from 'mocha'

const data = [42, 1, 2]

describe('Unit / Helper / array', function () {
  it('should work', function () {
    let result = array(data)
    expect(result).to.have.length(data.length)
  })
})
