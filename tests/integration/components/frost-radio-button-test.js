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
    this.on('changed', (event) => {
      expect(event.target.id).to.equal('groupId')
      expect(event.target.value).to.equal('testValue')
      run.next(() => {
        expect(this.$('input').prop('checked')).to.equal(true)
      })
    })

    this.render(hbs `
      {{#frost-radio-group onChange=(action 'changed') id='groupId'}}
        {{frost-radio-button value='testValue'}}
      {{/frost-radio-group}}
    `)

    expect(this.$('input').prop('checked')).to.equal(false)
    this.$('input').trigger('click')
  })
})
