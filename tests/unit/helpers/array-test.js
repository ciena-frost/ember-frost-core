import { expect } from 'chai'
import {
  describe,
  it
} from 'mocha'
import {
  array
} from 'ember-frost-core/helpers/array'

const data = [42, 1, 2]

describe('ArrayHelper', function () {
  it('works', function () {
    let result = array(data)
    expect(result).to.have.length(data.length)
  })
})
