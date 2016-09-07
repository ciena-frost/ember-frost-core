import {expect} from 'chai'
import {describeComponent} from 'ember-mocha'
import {beforeEach, it} from 'mocha'

describeComponent(
  'frost-combobox',
  'FrostComboboxComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-select', function () {
      expect(component.classNames).to.include('frost-select')
    })
  }
)
