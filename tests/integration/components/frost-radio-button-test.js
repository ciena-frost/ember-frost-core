/*global capture*/
import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

let changeEvent = function (event) {
  expect(event.target.id).to.equal('groupId')
  expect(event.target.value).to.equal('testValue')
  run.next(() => {
    expect(this.$('input').prop('checked')).to.equal(true)
  })
}
describeComponent('frost-radio-button', 'FrostRadioButtonComponent', {
  integration: true
}, function () {
  it('throws assertion errors', function () {
    expect(() => {
      this.render(hbs`{{frost-radio-button}}`)
    }).to.throw(/frost-radio-button/)
  })
  it('is triggered by keypress', function () {
    this.on('changed', changeEvent.bind(this))
    this.render(hbs `
      {{#frost-radio-group onChange=(action 'changed') id='groupId'}}
        {{frost-radio-button value='testValue'}}
      {{/frost-radio-group}}
    `)

    let event = Ember.$.Event('keypress')
    event.keyCode = 13

    expect(this.$('input').prop('checked')).to.equal(false)
    this.$('.frost-radio-button').trigger(event)
  })
  it('is triggered by click', function () {
    this.on('changed', changeEvent.bind(this))
    this.render(hbs `
      {{#frost-radio-group onChange=(action 'changed') id='groupId'}}
        {{frost-radio-button value='testValue'}}
      {{/frost-radio-group}}
    `)

    expect(this.$('input').prop('checked')).to.equal(false)
    this.$('input').trigger('click')
    return capture('radio-button', { experimentalSvgs: true })
  })
})
