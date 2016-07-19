import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-icon',
  'Integration: FrostIconComponent',
  {
    integration: true
  },

  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-icon}}
      //     template content
      //   {{/frost-icon}}
      // `);

      this.render(hbs`
        {{frost-icon icon='frost/round-add'}}
      `)

      expect(this.$()).to.have.length(1)
    })
  }
)
