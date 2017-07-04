import {expect} from 'chai'
import Ember from 'ember'
const {$} = Ember
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

import Component from 'ember-frost-core/components/frost-component'

const test = unit('frost-scroll')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myScroll'
    })
  })

  it('extends the common frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('registers and unregisters "ps-scroll-up" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollUp', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-scroll-up"), // eslint-disable-line
      'on() was called with "ps-scroll-up" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-scroll-up"), // eslint-disable-line
      'off() was called with "ps-scroll-up" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })

  it('registers and unregisters "ps-scroll-down" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollDown', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-scroll-down"), // eslint-disable-line
      'on() was called with "ps-scroll-down" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-scroll-down"), // eslint-disable-line
      'off() was called with "ps-scroll-down" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })

  it('registers and unregisters "ps-y-reach-start" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollYStart', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-y-reach-start"), // eslint-disable-line
      'on() was called with "ps-y-reach-start" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-y-reach-start"), // eslint-disable-line
      'off() was called with "ps-y-reach-start" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })

  it('registers and unregisters "ps-y-reach-end" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollYEnd', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-y-reach-end"), // eslint-disable-line
      'on() was called with "ps-y-reach-end" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-y-reach-end"), // eslint-disable-line
      'off() was called with "ps-y-reach-end" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })

  it('registers and unregisters "ps-scroll-x" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollX', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-scroll-x"), // eslint-disable-line
      'on() was called with "ps-scroll-x" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-scroll-x"), // eslint-disable-line
      'off() was called with "ps-scroll-x" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })

  it('registers and unregisters "ps-scroll-right" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollRight', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-scroll-right"), // eslint-disable-line
      'on() was called with "ps-scroll-right" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-scroll-right"), // eslint-disable-line
      'off() was called with "ps-scroll-right" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })

  it('registers and unregisters "ps-scroll-left" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollLeft', function () { return })

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("ps-scroll-left"), // eslint-disable-line
      'on() was called with "ps-scroll-left" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("ps-scroll-left"), // eslint-disable-line
      'off() was called with "ps-scroll-left" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })
})
