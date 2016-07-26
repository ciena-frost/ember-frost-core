import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'

describeComponent(
  'frost-button',
  'Integration: FrostButtonComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      this.render(hbs`{{frost-button icon="round-add"}}`)
    })

    it('renders as expected', function () {
      expect(
        this.$('.frost-icon-frost-round-add'),
        'includes expected icon'
      )
        .to.have.length(1)
    })
  }
)
