import {expect} from 'chai'
import {
  $hook,
  initialize
} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import {
  beforeEach
} from 'mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-radio-group',
  'Integration: FrostRadioGroupComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('block format', function () {
      const label = 'b'
      const value = 'a'

      this.set('label', label)
      this.set('value', value)

      this.render(hbs`
        {{#frost-radio-group as |controls|}}
          {{controls.button value=value label=label}}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button-input').first().prop('value'),
        'value is set'
      ).to.eql(value)

      expect(
        this.$('.frost-radio-button').first().text().trim(),
        'label is set'
      ).to.eql(label)
    })

    it('inline format', function () {
      const inputs = [
        {value: 'a', label: 'b'}
      ]

      this.set('inputs', inputs)

      this.render(hbs`
        {{frost-radio-group inputs=inputs}}
      `)

      expect(
        this.$('.frost-radio-button-input').first().prop('value'),
        'value is set'
      ).to.eql(inputs[0].value)

      expect(
        this.$('.frost-radio-button').first().text().trim(),
        'label is set'
      ).to.eql(inputs[0].label)
    })

    it('set hook property', function () {
      const hook = 'my-hook'

      this.set('hook', hook)

      this.render(hbs`
        {{frost-radio-group hook=hook}}
      `)

      expect(
        $hook(`${hook}`).hasClass('frost-radio-group'),
        'radio button group is set'
      ).to.be.true
    })
  }
)
