import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-select-outlet',
  'Integration: FrostSelectOutletComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{frost-select-outlet}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
