import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import PropTypeMixin from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
import {beforeEach, describe, it} from 'mocha'

import {unit} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'
import Component from 'ember-frost-core/components/frost-component'

const test = unit('frost-icon')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myIcon',
      icon: 'round-add'
    })
  })

  it('sets default property values correctly', function () {
    expect(
      component.get('tagName'),
      'tagName: "svg"'
    ).to.equal('svg')

    expect(
      component.get('pack'),
      'pack: "frost"'
    ).to.eql('frost')
  })

  it('extends the base frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('sets dependent keys correctly', function () {
    const iconClassDependentKeys = [
      'icon',
      'pack'
    ]

    expect(
      component.iconClass._dependentKeys,
      'Dependent keys are correct for iconClass()'
    ).to.eql(iconClassDependentKeys)
  })

  it('has the expected Mixins', function () {
    expect(
      PropTypeMixin.detect(component),
      'PropTypeMixin Mixin is present'
    ).to.equal(true)

    expect(
      SpreadMixin.detect(component),
      'SpreadMixin Mixin is present'
    ).to.equal(true)
  })

  describe('"iconClass" computed property', function () {
    it('is set correctly', function () {
      const pack = 'frost'
      const icon = 'add'

      run(() => {
        component.set('pack', pack)
        component.set('icon', icon)
      })

      expect(
        component.get('iconClass'),
        'iconClass: frost-icon-frost-add'
      ).to.eql('frost-icon-frost-add')
    })
  })
})
