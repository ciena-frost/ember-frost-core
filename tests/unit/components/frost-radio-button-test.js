/* jshint expr:true */
import { expect } from 'chai'
import Ember from 'ember'
import { describeComponent } from 'ember-mocha'
import {
  beforeEach,
  // describe,
  it
} from 'mocha'

describeComponent(
  'frost-radio-button',
  'Unit: FrostRadioButtonComponent',
  {
    // needs: [
    //   'component:frost-radio-group'
    // ],
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject({
        _setupAssertions: function () {
          return
        },
        value: 'testValue'
      })
    })

    it('includes className frost-radio-button', function () {
      expect(component.classNames).to.include('frost-radio-button')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('checked'),
        'checked: false'
      ).to.be.false

      expect(
        component.get('disabled'),
        'disabled: "false"'
      ).to.be.false

      expect(
        component.get('required'),
        'required: false'
      ).to.be.false

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.be.undefined
    })
  }
)
