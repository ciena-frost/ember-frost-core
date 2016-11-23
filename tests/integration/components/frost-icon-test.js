import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-icon',
  'Integration: FrostIconComponent',
  {
    integration: true
  },

  function () {
    it('sets icon class', function () {
      this.render(hbs`
        {{frost-icon icon='round-add'}}
      `)

      expect(
        this.$('.frost-icon-frost-round-add'),
        'Icon class is set correctly.'
      ).to.have.length(1)
    })

    it('sets the pack property', function () {
      this.render(hbs`
        {{frost-icon
          pack='test'
          icon='round-add'
        }}
      `)

      expect(
        this.$('.frost-icon-test-round-add'),
        'Icon class updates correctly when pack is set.'
      ).to.have.length(1)
    })
  }
)
