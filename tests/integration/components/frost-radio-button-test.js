import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {describe} from 'mocha'
import sinon from 'sinon'

let changeEvent = function (event) {
  expect(event.target.id).to.equal('groupId')
  expect(event.target.value).to.equal('testValue')
  run.next(() => {
    expect(this.$('input').prop('checked')).to.equal(true)
  })
}
describeComponent(
  'frost-radio-button',
  'Integration: FrostRadioButtonComponent',
  {
    integration: true
  },
  function () {
    it('throws assertion errors', function () {
      expect(
        () => {
          this.render(hbs`
            {{frost-radio-button}}
          `)
        },
        'assertion thrown when used without frost-radio-group'
      ).to.throw(/frost-radio-button/)
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
    })

    describe('onChange closure action', function () {
      it('is called on keypress', function () {
        const externalActionSpy = sinon.spy()

        this.on('externalAction', externalActionSpy)

        this.render(hbs`
          {{#frost-radio-group
            id='groupId'
            onChange=(action 'externalAction')
          }}
            {{frost-radio-button value='testValue'}}
          {{/frost-radio-group}}
        `)

        this.$('.frost-radio-button').trigger({ type: 'keypress', keyCode: 32 })

        expect(
          externalActionSpy.called,
          'onChange closure action called on keypress'
        ).to.be.true
      })

      it('is called on click', function () {
        const externalActionSpy = sinon.spy()

        this.on('externalAction', externalActionSpy)

        this.render(hbs`
          {{#frost-radio-group
            id='groupId'
            onChange=(action 'externalAction')
          }}
            {{frost-radio-button value='testValue'}}
          {{/frost-radio-group}}
        `)

        this.$('input').trigger('click')

        expect(
          externalActionSpy.called,
          'onChange closure action called on click'
        ).to.be.true
      })
    })
  }
)
