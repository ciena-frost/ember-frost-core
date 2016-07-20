const expect = chai.expect
import {describeComponent} from 'ember-mocha'
import {beforeEach, it} from 'mocha'

describeComponent(
  'frost-password',
  'FrostPasswordComponent',
  {
    needs: [
      'component:frost-text',
      'component:frost-text-clear'
    ],
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-password', function () {
      expect(component.classNames).to.include('frost-password')
    })

    it('defaults to zero tabindex', function () {
      expect(component.tabindex).to.equal(0)
      expect(this.$('input').prop('tabindex')).to.equal(0)
    })

    it('passes tabindex to the underlying field', function () {
      component.set('tabindex', -1)
      expect(component.tabindex).to.equal(-1)
      expect(this.$('input').prop('tabindex')).to.equal(-1)
    })
  }
)
