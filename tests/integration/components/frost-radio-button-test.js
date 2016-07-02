import Ember from 'ember'
import {
  expect
} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

const {
  run
} = Ember

describeComponent('frost-radio-button', 'FrostRadioButtonComponent', {
  integration: true
}, function () {
  it('Action fires correctly', function () {
    this.on('changed', (value) => {
      expect(value).to.equal('test')
    })
    this.render(hbs `
      {{frost-radio-button
          groupValue=groupValue
          value='test'
          changed='changed'
      }}
    `)

    expect(this.$('input').prop('checked')).to.equal(false)
    run(() => {
      this.$('input').trigger('click')
    })
    expect(this.$('input').prop('checked')).to.equal(true)
    expect(this.get('groupValue')).to.equal('test')
  })
})
