/**
 * Unit test for the hookable-textarea component
 */

import {expect} from 'chai'
import {HookMixin} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'

import {beforeEach} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/describe-component'

describeComponent(...unit('hookable-textarea'), function () {
  let component

  beforeEach(function () {
    component = this.subject()
  })

  it('should have the HookMixin', function () {
    expect(HookMixin.detect(component)).to.equal(true)
  })
})
