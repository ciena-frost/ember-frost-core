import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {describe} from 'mocha'
import sinon from 'sinon'

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

    it('calls with _createEvent() function', function () {
      const externalActionSpy = sinon.spy()
      const id = 'myTestGroupId'

      this.set('id', id)
      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{#frost-radio-group
          id=id
          onChange=(action 'externalAction')
        }}
          {{frost-radio-button value='testValue'}}
        {{/frost-radio-group}}
      `)

      this.$('input').trigger('click')

      expect(
        externalActionSpy.args[0][0].target.id,
        '_createEvent() added groupId'
      ).to.eql(id)
    })
  }
)
