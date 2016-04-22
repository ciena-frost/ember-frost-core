const expect = chai.expect
const {run} = Ember
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-textarea',
  'FrostTextareaComponent',
  {},
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-textarea', function () {
      expect(component.classNames).to.include('frost-textarea')
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

    it('defaults to zero tabindex', function () {
      expect(component.tabindex).to.equal(0)
      expect(this.$('textarea').prop('tabindex')).to.equal(0)
    })

    it('passes tabindex to the underlying field', function () {
      component.set('tabindex', -1)
      expect(component.tabindex).to.equal(-1)
      expect(this.$('textarea').prop('tabindex')).to.equal(-1)
    })
  }
)
