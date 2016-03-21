import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-core',
  'Integration: EmberFrostCoreComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-core}}
      //     template content
      //   {{/frost-core}}
      // `)

      this.render(hbs`{{frost-core}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
