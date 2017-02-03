/**
 * Unit test for the hookable-input component
 */

import {expect} from 'chai'
import {HookMixin} from 'ember-hook'
import {beforeEach, describe, it} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('hookable-input')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject()
  })

  it('should have the HookMixin', function () {
    expect(HookMixin.detect(component)).to.equal(true)
  })
})
