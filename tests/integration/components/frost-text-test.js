import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize} from 'ember-hook'

describeComponent(
  'frost-text',
  'Integration: FrostTextComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      this.render(hbs`{{frost-text}}`)
      expect(this.$()).to.have.length(1)
    })

    it('only renders the clear icon in insert', function () {
      this.set('external', 'temp')
      this.render(hbs`{{frost-text value=external}}`)
      expect(this.$('.frost-text-clear')).to.have.length(1)

      this.set('external', 'change')
      expect(this.$('.frost-text-clear')).to.have.length(1)
    })

    it('hook attr grabs frost-text as expected', function () {
      this.render(hbs`{{frost-text hook='my-text'}}`)

      expect($hook('my-text').hasClass('frost-text'))
        .to.be.true
      expect($hook('my-text-input').hasClass('frost-text-input'))
        .to.be.true

      expect($hook('my-text-clear').hasClass('frost-text-clear'))
        .to.be.true
    })
  }
)
