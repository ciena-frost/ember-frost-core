import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import $ from 'jquery'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = unit('frost-scroll')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myScroll'
    })
  })

  it('should extend the common frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('should register and unregister "ps-scroll-up" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollUp', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "ps-scroll-down" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollDown', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "ps-y-reach-start" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollYStart', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "ps-y-reach-end" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollYEnd', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "ps-scroll-x" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollX', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "ps-scroll-right" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollRight', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "ps-scroll-left" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onScrollLeft', function () { return }) // eslint-disable-line no-useless-return

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

  it('should register and unregister "mouseenter" event handlers', function () {
    const spyOn = sinon.spy($.fn, 'on')
    const spyOff = sinon.spy($.fn, 'off')

    component.set('onMouseEnter', function () { return }) // eslint-disable-line no-useless-return

    this.render()

    spyOn.reset()

    component.trigger('didInsertElement')

    expect(
      spyOn.calledWith("mouseenter"), // eslint-disable-line
      'on() was called with "mouseenter" event'
    ).to.equal(true)

    spyOff.reset()

    component.trigger('willDestroyElement')

    expect(
      spyOff.calledWith("mouseenter"), // eslint-disable-line
      'off() was called with "mouseenter" event'
    ).to.equal(true)

    $.fn.on.restore()
    $.fn.off.restore()
  })
})
