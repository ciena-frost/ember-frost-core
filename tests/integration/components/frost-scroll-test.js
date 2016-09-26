/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import sinon from 'sinon'

describeComponent(
  'frost-scroll',
  'Integration: FrostScrollComponent',
  {
    integration: true
  },
  function () {
    it('sets full class correctly', function () {
      this.render(hbs`
        {{frost-scroll class='full'}}
      `)
      expect(
        this.$('.frost-scroll').hasClass('full'),
        'has class full'
      ).to.be.true
    })

    it('onScrollUp closure action is called', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-scroll
          onScrollUp=(action 'externalAction')
        }}
      `)

      this.$('.frost-scroll').trigger('ps-scroll-up')

      expect(
        externalActionSpy.called,
        'onScrollUp closure action called on ps-scroll-up'
      ).to.be.true
    })

    it('onScrollDown closure action is called', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-scroll
          onScrollDown=(action 'externalAction')
        }}
      `)

      this.$('.frost-scroll').trigger('ps-scroll-down')

      expect(
        externalActionSpy.called,
        'onScrollDown closure action called on ps-scroll-down'
      ).to.be.true
    })

    it('onScrollYStart closure action is called', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-scroll
          onScrollYStart=(action 'externalAction')
        }}
      `)

      this.$('.frost-scroll').trigger('ps-y-reach-start')

      expect(
        externalActionSpy.called,
        'onScrollYStart closure action called on ps-y-reach-start'
      ).to.be.true
    })

    it('onScrollYEnd closure action is called', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-scroll
          onScrollYEnd=(action 'externalAction')
        }}
      `)

      this.$('.frost-scroll').trigger('ps-y-reach-end')

      expect(
        externalActionSpy.called,
        'onScrollYEnd closure action called on ps-y-reach-end'
      ).to.be.true
    })
  }
)
