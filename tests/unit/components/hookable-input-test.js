/**
 * Unit test for the hookable-input component
 */

import {expect} from 'chai'
import {unit} from 'dummy/tests/helpers/ember-test-utils/describe-component'
import {HookMixin} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'

describeComponent(...unit('hookable-input'), function () {
  let component

  beforeEach(function () {
    component = this.subject()
  })

  it('should have the HookMixin', function () {
    expect(HookMixin.detect(component)).to.equal(true)
  })
})
