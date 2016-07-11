/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-text',
  'Integration: FrostTextComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{frost-text}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
