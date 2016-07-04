/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'frost-radio-group',
  'Integration: FrostRadioGroupComponent',
  {
    integration: true
  },
  function() {
    it('renders', function () {
      this.render(hbs`{{frost-radio-group}}`)
      expect(this.$()).to.have.length(1)
    });
  }
);
