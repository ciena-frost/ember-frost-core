import {run} from '@ember/runloop'
import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-textarea')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myTextarea'
    })
  })

  it('should set default property values correctly', function () {
    expect(
      component.get('autofocus'),
      'autofocus: false'
    ).to.equal(false)

    expect(
      component.get('cols'),
      'cols: null'
    ).to.equal(null)

    expect(
      component.get('disabled'),
      'disabled: false'
    ).to.equal(false)

    expect(
      component.get('form'),
      'form: null'
    ).to.equal(null)

    expect(
      component.get('isClearEnabled'),
      'isClearEnabled: false'
    ).to.equal(false)

    expect(
      component.get('isClearVisible'),
      'isClearVisible: false'
    ).to.equal(false)

    expect(
      component.get('placeholder'),
      'placeholder: null'
    ).to.equal(null)

    expect(
      component.get('readonly'),
      'readonly: false'
    ).to.equal(false)

    expect(
      component.get('rows'),
      'rows: null'
    ).to.equal(null)

    expect(
      component.get('tabindex'),
      'tabindex: 0'
    ).to.be.eql(0)

    expect(
      component.get('value'),
      'value: null'
    ).to.equal(null)

    expect(
      component.get('wrap'),
      'wrap: soft'
    ).to.be.eql('soft')
  })

  it('should extend the commone frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('should have the expect Mixins', function () {
    expect(
      FrostEventsProxy.detect(component),
      'FrostEventsProxy is present'
    ).to.equal(true)
  })

  describe('when keyUp property is omitted', function () {
    beforeEach(function () {
      run(() => component.set('keyUp', undefined))
    })

    it('should not throw an error when keyUp action is triggered', function () {
      expect(
        function () {
          component.get('actions.keyUp').call(component)
        },
        'error not triggered by keyup()'
      ).not.to.throw(Error)
    })
  })
})
