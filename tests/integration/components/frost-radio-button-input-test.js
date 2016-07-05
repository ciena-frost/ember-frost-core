/* jshint expr:true */
import { expect } from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-radio-button-input',
  'Integration: FrostRadioButtonInputComponent',
  {
    integration: true
  },
  function () {
    it('throws error when not in frost-radio-button', function () {
      expect(() => {
        this.render(hbs`{{frost-radio-button-input}}`)
      }).to.throw(/frost-radio-button-input/)
    })
  }
)
