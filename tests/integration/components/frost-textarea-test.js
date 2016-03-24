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
      Ember.run(() => this.$('#action').val('a').trigger('input'))
      Ember.run.next(this, () => {
        expect(this.get('input-value')).to.eql('a')
      })
    })
  }
)
