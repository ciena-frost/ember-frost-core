/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent
} from 'ember-mocha'
import {
  afterEach,
  beforeEach,
  describe,
  it
} from 'mocha'
import {
  $hook,
  initialize
} from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'

describeComponent(
  'frost-scroll',
  'Integration: FrostScrollComponent',
  {
    integration: true
  },
  function () {
    let sandbox

    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      this.render(hbs`{{frost-scroll}}`)
      expect(this.$()).to.have.length(1)
    })

    describe('actions', function () {
      beforeEach(function () {
        sandbox = sinon.sandbox.create()

        this.setProperties({
          onScrollUp: sinon.spy(),
          onScrollDown: sinon.spy(),
          onScrollYStart: sinon.spy(),
          onScrollYEnd: sinon.spy()
        })

        this.render(hbs`{{frost-scroll hook='scroll'}}`)
      })

      afterEach(function () {
        sandbox.restore()
      })

      it('sends onScrollUp action when scrolling up', function () {
        // TODO figure out how to simulate scrolling
        $hook('scroll')
        expect(this.get('onScrollUp').called).to.be.true
      })

      it('sends onScrollDown action when scrolling down', function () {
        // TODO figure out how to simulate scrolling
        $hook('scroll')
        expect(this.get('onScrollDown').called).to.be.true
      })

      it('sends onScrollYStart action when scrolled to top', function () {
        // TODO figure out how to simulate scrolling
        $hook('scroll')
        expect(this.get('onScrollYStart').called).to.be.true
      })

      it('sends onScrollYEnd action when scrolled to bottom', function () {
        // TODO figure out how to simulate scrolling
        $hook('scroll')
        expect(this.get('onScrollUp').called).to.be.true
      })
    })
  }
)
