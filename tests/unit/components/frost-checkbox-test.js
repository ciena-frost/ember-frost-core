const expect = chai.expect
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-checkbox',
  'FrostCheckboxComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-checkbox', function () {
      expect(component.classNames).to.include('frost-checkbox')
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
  }
)
