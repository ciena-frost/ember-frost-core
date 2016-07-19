/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'frost-text-clear',
  'Integration: FrostTextClearComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-text-clear}}
      //     template content
      //   {{/frost-text-clear}}
      // `);

      this.render(hbs`{{frost-text-clear}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
