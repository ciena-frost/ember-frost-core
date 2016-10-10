import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-select-dropdown',
  'Integration: FrostSelectDropdownComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      this.render(hbs`{{frost-select-dropdown}}`)
      expect(this.$()).to.have.length(1)
    })
  }
)
