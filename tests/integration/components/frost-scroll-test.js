/* jshint expr:true */
import { expect } from 'chai'
import {$hook} from 'ember-hook'
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
      ).to.equal(true)
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
      ).to.equal(true)
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
      ).to.equal(true)
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
      ).to.equal(true)
    })

    it('renders using spread', function () {
      const hook = 'my-hook'

      this.set('hook', hook)

      this.render(hbs`
        {{frost-scroll
          options=(hash
            hook=hook
          )
        }}
      `)

      expect(
        $hook(hook).hasClass('frost-scroll'),
        'scroll has been rendered'
      ).to.equal(true)
    })
  }
)
