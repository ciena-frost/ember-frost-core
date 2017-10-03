import {run} from '@ember/runloop'
import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import $ from 'jquery'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = unit('frost-checkbox', ['helper:hook'])
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myCheckbox'
    })
  })

  it('sets default property values correctly', function () {
    expect(
      component.get('size'),
      'size: "small"'
    ).to.eql('small')

    expect(
      component.get('label'),
      'label: ""'
    ).to.eql('')

    expect(
      component.get('autofocus'),
      'autofocus: "false"'
    ).to.equal(false)

    expect(
      component.get('checked'),
      'checked: "false"'
    ).to.equal(false)

    expect(
      component.get('disabled'),
      'disabled: "false"'
    ).to.equal(false)

    expect(
      component.get('inputId'),
      'inputId: "null"'
    ).not.to.equal(null)
  })

  it('extends the base frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('_setInputId() concatenates elmenentId to "_input"', function () {
    const testInputId = component.get('elementId')

    component._setInputId()

    expect(
      component.get('inputId')
    ).to.eql(`${testInputId}_input`)
  })

  describe('when onBlur property is omitted', function () {
    beforeEach(function () {
      run(() => component.set('onBlur', undefined))
    })

    it('does not throw an error when onBlur action is triggered', function () {
      expect(function () {
        component.get('actions.onBlur').call(component)
      }).not.to.throw(Error)
    })
  })

  describe('keyPress()', function () {
    const preventDefaultSpy = sinon.spy()
    const stopPropagationSpy = sinon.spy()

    const eventTestObject = {
      keyCode: 32,
      preventDefault: preventDefaultSpy,
      stopPropagation: stopPropagationSpy
    }

    beforeEach(function () {
      preventDefaultSpy.reset()
      stopPropagationSpy.reset()
    })
    it('sets state to checked', function () {
      this.render()

      component.keyPress(eventTestObject)

      expect(
        $('input').prop('checked'),
        'keyPress() sets checked state'
      ).to.equal(true)
    })

    it('does not set state to checked when disabled is true', function () {
      const disabled = true

      this.render()

      run(() => component.set('disabled', disabled))

      component.keyPress(eventTestObject)

      expect(
        $('input').prop('checked'),
        'keyPress() did not set checked state'
      ).to.equal(false)
    })

    it('calls preventDefault', function () {
      this.render()

      component.keyPress(eventTestObject)

      expect(
        preventDefaultSpy.called,
        'preventDefault() was called'
      ).to.equal(true)
    })

    it('calls stopPropogation', function () {
      this.render()

      component.keyPress(eventTestObject)

      expect(
        stopPropagationSpy.called,
        'stopPropagation() was called'
      ).to.equal(true)
    })

    it('returns false', function () {
      this.render()

      expect(
        component.keyPress(eventTestObject),
        'keyPress() returned false'
      ).to.equal(false)
    })

    it('calls input() action', function () {
      const spy = sinon.spy(component, 'send')

      this.render()

      component.keyPress(eventTestObject)

      expect(
        spy.args[0].join(),
        'input() was called'
      ).to.eql('input')
    })
  })
})
