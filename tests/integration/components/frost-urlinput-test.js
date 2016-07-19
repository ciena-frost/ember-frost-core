/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-url-input',
  'Integration: FrostTextComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{frost-url-input}}`)
      expect(this.$()).to.have.length(1)
    })

    it('only renders the clear icon in insert', function () {
      this.set('external', 'temp')
      this.render(hbs`{{frost-url-input value=external}}`)
      expect(this.$('.frost-url-input-clear')).to.have.length(1)

      this.set('external', 'change')
      expect(this.$('.frost-url-input-clear')).to.have.length(1)
    })
  }
)
