import {expect} from 'chai'
import {
  $hook,
  initialize
} from 'ember-hook'
import {
  describeComponent,
  it
} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  beforeEach,
  describe
} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-radio-button',
  'Integration: FrostRadioButtonComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('throws assertion errors', function () {
      expect(
        () => {
          this.render(hbs`
            {{frost-radio-button}}
          `)
        },
        'assertion thrown when used without frost-radio-group'
      ).to.throw(/frost-radio-button/)

      expect(
        () => {
          this.render(hbs`
            {{#frost-radio-group
            value='testValue'
          }}
            {{frost-radio-button}}
          {{/frost-radio-group}}
          `)
        },
        'assertion thrown when radio-button used without setting a value'
      ).to.throw(/initialized with a 'value'/)
    })

    describe('Checked property', function () {
      it('sets checked property', function () {
        this.render(hbs`
          {{#frost-radio-group
            value='testValue'
          }}
            {{frost-radio-button value='testValue'}}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass('checked'),
          'checked class is set'
        ).to.be.true

        expect(
          this.$('.frost-radio-button-input').prop('checked'),
          'checked is set'
        ).to.be.true
      })

      it('does not set checked property', function () {
        this.render(hbs`
          {{#frost-radio-group}}
            {{frost-radio-button value='testValue'}}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass('checked'),
          'checked class is set'
        ).to.be.false

        expect(
          this.$('.frost-radio-button-input').prop('checked'),
          'checked is set'
        ).to.be.false
      })
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{#frost-radio-group}}
          {{frost-radio-button
            disabled=true
            value='testValue'
          }}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button').hasClass('disabled'),
        'disabled class is set'
      ).to.be.true

      expect(
        this.$('.frost-radio-button-input').prop('disabled'),
        'disabled class is set'
      ).to.be.true
    })

    it('sets hook property on input tag', function () {
      this.render(hbs`
        {{#frost-radio-group}}
          {{frost-radio-button
            hook='my-radio-button'
            value='testValue'
          }}
        {{/frost-radio-group}}
      `)

      expect(
          $hook('my-radio-button-input').hasClass('frost-radio-button-input'),
          'input hook is set'
        ).to.be.true
    })

    describe('Size property', function () {
      it('has small class set', function () {
        const size = 'small'

        this.set('size', size)

        this.render(hbs`
          {{#frost-radio-group}}
            {{frost-radio-button
              size=size
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass(size),
          'small class is set'
        ).to.be.true
      })

      it('has medium class set', function () {
        const size = 'medium'

        this.set('size', size)

        this.render(hbs`
          {{#frost-radio-group}}
            {{frost-radio-button
              size=size
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass(size),
          'medium class is set'
        ).to.be.true
      })

      it('has large class set', function () {
        const size = 'large'

        this.set('size', size)

        this.render(hbs`
          {{#frost-radio-group}}
            {{frost-radio-button
              size=size
              value='testValue'
            }}
          {{/frost-radio-group}}
        `)

        expect(
          this.$('.frost-radio-button').hasClass(size),
          'large class is set'
        ).to.be.true
      })
    })

    it('sets required property', function () {
      this.render(hbs`
        {{#frost-radio-group}}
          {{frost-radio-button
            required=true
            value='testValue'
          }}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button').hasClass('required'),
        'required class is set'
      ).to.be.true

      expect(
        this.$('.frost-radio-button-input').prop('required'),
        'required class is set'
      ).to.be.true
    })

    it('sets type to "radio"', function () {
      this.render(hbs`
        {{#frost-radio-group}}
          {{frost-radio-button value='testValue'}}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button-input').prop('type'),
        'type is set to radio'
      ).to.eql('radio')
    })

    it('sets value property', function () {
      const value = 'test value'

      this.set('value', value)

      this.render(hbs`
        {{#frost-radio-group}}
          {{frost-radio-button
            value=value
          }}
        {{/frost-radio-group}}
      `)

      expect(
        this.$('.frost-radio-button-input').prop('value'),
        'value is set'
      ).to.eql(value)
    })

    describe('onChange closure action', function () {
      it('is called on keypress of "enter"', function () {
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

        this.$('.frost-radio-button').trigger({ type: 'keypress', keyCode: 13 })

        expect(
          externalActionSpy.called,
          'onChange closure action called on keypress "enter"'
        ).to.be.true
      })

      it('is called on keypress of "spacebar"', function () {
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
          'onChange closure action called on keypress "spacebar"'
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

    it('calls _createEvent() which sets the target id ', function () {
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
