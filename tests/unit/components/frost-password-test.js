const expect = chai.expect
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-password',
  'FrostPasswordComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-password', function () {
      expect(component.classNames).to.include('frost-password')
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
