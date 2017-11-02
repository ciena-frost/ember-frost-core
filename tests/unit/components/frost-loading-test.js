import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-loading')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myLoader'
    })
  })

  it('sets default property values correctly', function () {
    expect(
      component.get('type'),
      'type: "ripple"'
    ).to.eql('ripple')
  })

  it('extends the commone frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })
})
