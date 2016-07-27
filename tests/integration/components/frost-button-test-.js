import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'
import {$hook, initialize} from 'ember-hook'

describeComponent(
  'frost-button',
  'Integration: FrostButtonComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
      this.render(hbs`{{frost-button hook='my-button' icon="round-add" text='Test'}}`)
    })

    it('renders as expected', function () {
      expect(
        this.$('.frost-icon-frost-round-add'),
        'includes expected icon'
      )
        .to.have.length(1)

        expect($hook('my-button').text().trim())
         .to.equal('Test')
    })
  }
)
