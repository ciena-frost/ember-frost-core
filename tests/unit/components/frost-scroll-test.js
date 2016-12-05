import {expect} from 'chai'
import Ember from 'ember'
const {$} = Ember
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  it
} from 'mocha'
import sinon from 'sinon'
import SpreadMixin from 'ember-spread'

describeComponent(
  'frost-scroll',
  'Unit: FrostScrollComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-scroll', function () {
      expect(component.classNames).to.include('frost-scroll')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.equal(undefined)
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
  }
)
