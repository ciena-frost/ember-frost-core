/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';

describeComponent(
  'hello-testing',
  'Integration: HelloTestingComponent',
  {
    integration: true
  },
  function() {
    it('renders', function() {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#hello-testing}}
      //     template content
      //   {{/hello-testing}}
      // `);

      this.render(hbs`{{hello-testing}}`);
      expect(this.$()).to.have.length(1);
    });
  }
);
