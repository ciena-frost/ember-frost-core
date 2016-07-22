import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-textarea',
  'Integration: FrostTextAreaComponent',
  {
    integration: true
  },
  function () {
    it('renders', function () {
      // Set any properties with this.set('myProperty', 'value')
      // Handle any actions with this.on('myAction', function (val) { ... })
      // Template block usage:
      // this.render(hbs`
      //   {{#frost-textarea}}
      //     template content
      //   {{/frost-textarea}}
      // `)

      this.render(hbs`{{frost-textarea}}`)
      expect(this.$()).to.have.length(1)
    })

    it('action is fired on input', function () {
      this.set('input-value', '')
      this.on('test-action', function (attr) {
        this.set('input-value', attr.value)
      })

      this.render(hbs`{{frost-textarea id="action" onInput=(action "test-action")}}`)
      run(() => this.$('#action').val('a').trigger('input'))
      run.next(this, () => {
        expect(this.get('input-value')).to.eql('a')
      })
    })

    it('textarea cleared on button click', function () {
      this.set('input-value', '')
      this.on('test-action', function (attr) {
        this.set('input-value', attr.value)
      })

      this.render(hbs`{{frost-textarea id="clearText" onInput=(action "test-action")}}`)
      run(() => this.$('#clearText').val('a').trigger('input'))
      run(() => this.$('#clearText .clear').click())
      run.next(this, () => {
        expect(this.get('input-value')).to.eql('')
      })
    })

    it('calls onBlur callback when focus is lost', function (done) {
      this.on('test-action', function () {
        done()
      })

      this.render(hbs`{{frost-textarea onBlur=(action "test-action")}}`)
      this.$('textarea').focus().val('a').focusout()
    })

    // it('calls onFocus callback when focused', function (done) {
    //   this.on('test-action', function () {
    //     done()
    //   })
    //
    //   this.render(hbs`{{frost-text onFocus=(action "test-action")}}`)
    //   this.$('input').val('a').focusout().focus()
    // })
  }
)
