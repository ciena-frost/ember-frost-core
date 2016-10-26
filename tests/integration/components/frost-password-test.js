import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize} from 'ember-hook'

describeComponent(
  'frost-password',
  'Integration: FrostPasswordComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-password}}
      //     template content
      //   {{/frost-password}}
      // `)

      this.render(hbs`{{frost-password}}`)
      expect(this.$()).to.have.length(1)
    })

    it('action is fired on input', function () {
      this.set('input-value', '')
      this.on('test-action', function (attr) {
        this.set('input-value', attr.value)
      })

      this.render(hbs`{{frost-password id="action" onInput=(action "test-action")}}`)
      run(() => this.$('#action').val('a').trigger('input'))
      run.next(this, () => {
        expect(this.get('input-value')).to.eql('a')
      })
    })

    it('calls onBlur callback when focus is lost', function (done) {
      this.on('test-action', function () {
        done()
      })

      this.render(hbs`{{frost-password onBlur=(action "test-action")}}`)
      this.$('input').focus().val('a').focusout()
    })

    it('hook attr grabs frost-password as expected', function () {
      this.render(hbs`{{frost-password hook='my-password'}}`)

      expect($hook('my-password').hasClass('frost-password'))
        .to.be.true
      expect($hook('my-password-input').hasClass('frost-text-input'))
        .to.be.true
      expect($hook('my-password-clear').hasClass('frost-text-clear'))
        .to.be.true
    })

    // TODO add tests for tabindex
  }
)
