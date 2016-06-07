import Ember from 'ember'
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-password',
  'Integration: FrostPasswordComponent',
  {
    integration: true
  },
  function () {
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
      Ember.run(() => this.$('#action').val('a').trigger('input'))
      Ember.run.next(this, () => {
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
  }
)
