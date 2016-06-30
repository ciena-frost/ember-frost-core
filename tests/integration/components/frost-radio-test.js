/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'frost-radio',
  'Integration: FrostRadioComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-radio}}
      //     template content
      //   {{/frost-radio}}
      // `);

      this.render(hbs`{{frost-radio}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
