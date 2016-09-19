import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize} from 'ember-hook'

describeComponent(
  'frost-textarea',
  'Integration: FrostTextAreaComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      this.render(hbs`
        {{frost-textarea}}
      `)

      expect(
        this.$(),
        'class frost-textarea is set'
      ).to.have.length(1)
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

    it('hook attr grabs frost-textarea as expected', function () {
      this.set('input-value', '')
      this.on('test-action', function (attr) {
        this.set('input-value', attr.value)
      })
      this.render(hbs`{{frost-textarea id="action" onInput=(action "test-action") hook='my-textarea'}}`)

      expect($hook('my-textarea').hasClass('frost-textarea'))
        .to.be.true

      expect($hook('my-textarea-input').hasClass('ember-text-area'))
        .to.be.true
    })
  }
)
