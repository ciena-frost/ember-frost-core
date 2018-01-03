import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'

const test = integration('frost-radio-group')
describe(test.label, function () {
  test.setup()

  it('should support block format', function () {
    const label = 'b'
    const value = 'a'

    this.set('label', label)
    this.set('value', value)

    this.render(hbs`
      {{#frost-radio-group hook='myRadioGroup' as |controls|}}
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

  it('should support inline format', function () {
    const inputs = [
      {value: 'a', label: 'b'}
    ]

    this.set('inputs', inputs)

    this.render(hbs`
      {{frost-radio-group hook='myRadioGroup' inputs=inputs}}
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

  it('should set hook property', function () {
    const hook = 'my-hook'

    this.set('hook', hook)

    this.render(hbs`
      {{frost-radio-group hook=hook}}
    `)

    expect(
      $hook(`${hook}`).hasClass('frost-radio-group'),
      'radio button group is set'
    ).to.equal(true)
  })

  it('should render using spread', function () {
    const value = 'b'
    const label = `Label for ${value}`

    this.set('value', value)
    this.set('label', label)

    this.render(hbs`
      {{#frost-radio-group
        options=(hash
          hook='myRadioGroup'
          id='radioGroup7'
          selectedValue=value
        )
        as |controls|
      }}
          {{#controls.button
            options=(hash
              size='medium'
            )
            value=value
          }}
            {{label}}
          {{/controls.button}}
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
})
