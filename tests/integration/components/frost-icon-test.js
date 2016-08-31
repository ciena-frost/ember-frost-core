import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'
import {
  $hook,
  initialize
} from 'ember-hook'

describeComponent(
  'frost-icon',
  'Integration: FrostIconComponent',
  {
    integration: true
  },

  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders default values', function () {
      this.render(hbs`
        {{frost-icon icon='round-add'}}
      `)

      expect(
        this.$('.frost-icon').hasClass('frost-icon-frost-round-add'),
        'Icon class is set correctly.'
      ).to.be.true
    })

    it('sets the pack property', function () {
      this.render(hbs`
        {{frost-icon
          pack='test'
          icon='round-add'
        }}
      `)

      expect(
        this.$('.frost-icon').hasClass('frost-icon-test-round-add'),
        'Icon class is set correctly.'
      ).to.be.true
    })

    it('sets the hook property', function () {
      this.render(hbs`
        {{frost-icon
          hook='my-icon'
          icon='round-add'
        }}
      `)

      expect(
        $hook('my-icon').hasClass('frost-icon-frost-round-add'),
        'Hook is set correctly'
      ).to.be.true
    })
  }
)
