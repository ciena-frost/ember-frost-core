/**
 * Unit test for the hookable-textarea component
 */

import {expect} from 'chai'
import {HookMixin} from 'ember-hook'
import {beforeEach, describe, it} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = unit('hookable-textarea')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myTextarea'
    })
  })

  it('should have the HookMixin', function () {
    expect(HookMixin.detect(component)).to.equal(true)
  })
})
