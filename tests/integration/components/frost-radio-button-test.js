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
  it('throws assertion errors', function () {
    expect(() => {
      this.render(hbs`{{frost-radio-button}}`)
    }).to.throw(/frost-radio-button/)
  })
  it('works as expected', function () {
    this.on('changed', (value) => {
      expect(value).to.equal('test')
    })
    this.render(hbs `
      {{#frost-radio-group onChange='changed' id=groupTest}}
        {{frost-radio-button value='test'}}
      {{/frost-radio-group}}
    `)

    expect(this.$('input').prop('checked')).to.equal(false)
    run(() => {
      this.$('input').trigger('click')
    })
    expect(this.$('input').prop('checked')).to.equal(true)
    expect(this.get('groupTest')).to.equal('test')
  })
})
