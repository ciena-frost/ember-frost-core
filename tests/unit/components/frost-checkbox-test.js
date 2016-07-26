import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-checkbox',
  'FrostCheckboxComponent',
  {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('sets dependent keys correctly', function () {
      const isCheckedDependentKeys = [
        'checked'
      ]

      const sizeClassDependentKeys = [
        'size'
      ]

      const inputIdDependentKeys = [
        'id'
      ]

      expect(
        component.isChecked._dependentKeys,
        'Dependent keys are correct for isChecked()'
      ).to.eql(isCheckedDependentKeys)

      expect(
        component.sizeClass._dependentKeys,
        'Dependent keys are correct for sizeClass()'
      ).to.eql(sizeClassDependentKeys)

      expect(
        component.inputId._dependentKeys,
        'Dependent keys are correct for inputId()'
      ).to.eql(inputIdDependentKeys)
    })

    it('defaults state to unchecked', function () {
      expect(component.get('isChecked')).to.equal(false)
    })

    describe('isChecked', function () {
      [
        {in: undefined, out: false},
        {in: null, out: false},
        {in: false, out: false},
        {in: true, out: true}
      ].forEach((test) => {
        it(`returns ${test.out} when checked is ${test.in}`, function () {
          run(() => {
            component.set('checked', test.in)
          })
          expect(component.get('isChecked')).to.equal(test.out)
        })
      })
    })

    describe('when onBlur property is omitted', function () {
      beforeEach(function () {
        run(() => {
          component.set('onBlur', undefined)
        })
      })

      it('does not throw an error when onBlur action is triggered', function () {
        expect(function () {
          component.get('actions.onBlur').call(component)
        }).not.to.throw(Error)
      })
    })
  }
)
