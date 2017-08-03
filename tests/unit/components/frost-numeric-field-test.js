import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import Component from 'ember-frost-core/components/frost-component'
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-numeric-field', ['helper:hook'])
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myNumericField',
      value: '3'
    })
  })

  it('sets default property values correctly', function () {
    expect(
      component.get('align'),
      'align: left'
    ).to.be.eql('left')

    expect(
      component.get('autofocus'),
      'autofocus: "false"'
    ).to.equal(false)

    expect(
      component.get('autocorrect'),
      'autocorrect: off'
    ).to.be.eql('off')

    expect(
      component.get('autocapitalize'),
      'autocapitalize: off'
    ).to.be.eql('off')
    expect(
      component.get('isHookEmbedded'),
      'isHookEmbedded: false'
    ).to.equal(false)

    expect(
      component.get('isIncrementControlVisible'),
      'isIncrementControlVisible: false'
    ).to.equal(false)

    expect(
      component.get('allowNegativeValues'),
      'allowNegativeValues: false'
    ).to.equal(false)

    expect(
      component.get('readonly'),
      'readonly: false'
    ).to.equal(false)

    expect(
      component.get('required'),
      'required: false'
    ).to.equal(false)

    expect(
      component.get('spellcheck'),
      'spellcheck: false'
    ).to.equal(false)

    expect(
      component.get('tabindex'),
      'tabindex: 0'
    ).to.be.eql(0)

    expect(
      component.get('type'),
      'type: text'
    ).to.be.eql('text')

    expect(
      component.get('maxlength'),
      'maxlength: undefined'
    ).to.equal(undefined)
  })

  it('extends the commone frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('has the expect Mixins', function () {
    expect(
      FrostEventsProxy.detect(component),
      'FrostEventsProxy is present'
    ).to.equal(true)
  })
})
