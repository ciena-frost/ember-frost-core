import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

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
