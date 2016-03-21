import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-checkbox',
  'Integration: FrostCheckboxComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.on('myAction', function(val) { ... });
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-checkbox}}
      //     template content
      //   {{/frost-checkbox}}
      // `);

    this.render(hbs`{{frost-checkbox}}`)
      expect(this.$()).to.have.length(1)
    }),

    it('triggers value change', function () {
      this.set('checkbox-value', '')
      this.on('valueChange', function (val) {
        this.set('checkbox-value', val)
      })
      this.render(hbs`{{#frost-checkbox
        id="value"
        value="value"
        on-input=(action "valueChange")}}value{{/frost-checkbox}}
      `)
      var input = this.$('input')
      input.trigger('input')
      Ember.run.next(this, () => {
        expect(this.get('checkbox-value')).to.eql(true)
      })
    })
  }
)
