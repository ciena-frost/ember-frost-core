import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize} from 'ember-hook'
import sinon from 'sinon'

describeComponent(
  'frost-text',
  'Integration: FrostTextComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      this.render(hbs`
          {{frost-text}}
      `)

      expect(
        this.$('input').attr('tabindex'),
        'tabindex is set'
      ).to.eql('0')

      expect(
        this.$('input').attr('type'),
        'type is set'
      ).to.eql('text')

      expect(
        this.$('input').hasClass('frost-text-input'),
        'class "frost-text-input" is set'
      ).to.be.true

      expect(
        this.$('input').hasClass('left'),
        'class "left" is set'
      ).to.be.true

      expect(
        this.$('.frost-text-clear'),
        'class "frost-text-clear" is set'
      ).to.have.length(1)
    })

    it('sets align property', function () {
      const align = 'right'

      this.set('align', align)

      this.render(hbs`
          {{frost-text
            align=align
          }}
      `)

      expect(
        this.$('input').hasClass('right'),
        'class "right" is set'
      ).to.be.true
    })

    it('sets autocapitalize property', function () {
      this.render(hbs`
          {{frost-text
            autocapitalize='on'
          }}
      `)

      expect(
        this.$('input').attr('autocapitalize'),
        'autocapitalize attribute is set'
      ).to.eql('on')
    })

    it('sets autocorrect property', function () {
      this.render(hbs`
          {{frost-text
            autocorrect='on'
          }}
      `)

      expect(
        this.$('input').attr('autocorrect'),
        'autocorrect attribute is set'
      ).to.eql('on')
    })

    it('sets autofocus property', function () {
      this.render(hbs`
          {{frost-text
            autofocus=true
          }}
      `)

      expect(
        this.$('input').attr('autofocus'),
        'autofocus attribute is set'
      ).to.eql('autofocus')
    })

    it('sets maxlength property', function () {
      const maxlength = '30'

      this.set('maxlength', maxlength)

      this.render(hbs`
        {{frost-text
          maxlength=maxlength
        }}
     `)

      expect(
        this.$('input').attr('maxlength'),
        'maxlength is set'
      ).to.eql('30')
    })

    it('sets placeholder property', function () {
      const placeholder = 'Enter here'

      this.set('placeholder', placeholder)

      this.render(hbs`
        {{frost-text
          placeholder=placeholder
        }}
     `)

      expect(
        this.$('input').attr('placeholder'),
        'placeholder is set'
      ).to.eql('Enter here')
    })

    it('sets value property', function () {
      const value = 'Testing'

      this.set('value', value)

      this.render(hbs`
        {{frost-text
          value=value
        }}
      `)

      expect(
        this.$('input').val(),
        'value is set'
      ).to.eql('Testing')
    })

    it('set disabled property', function () {
      this.render(hbs`
        {{frost-text
          disabled=true
        }}
      `)

      expect(
        this.$('input').attr('disabled'),
        'disabled attribute is set'
      ).to.eql('disabled')
    })

    it('set readonly property', function () {
      this.render(hbs`
        {{frost-text
          readonly=true
        }}
      `)

      expect(
        this.$('input').attr('readonly'),
        'readonly attribute is set'
      ).to.eql('readonly')
    })

    it('set required property', function () {
      this.render(hbs`
        {{frost-text
          required=true
        }}
      `)

      expect(
        this.$('input').attr('required'),
        'required attribute is set'
      ).to.eql('required')
    })

    it('set spellcheck property', function () {
      this.render(hbs`
        {{frost-text
          spellcheck='true'
        }}
      `)

      expect(
        this.$('input').attr('spellcheck'),
        'spellcheck attribute is set'
      ).to.eql('true')
    })

    it('sets error class', function () {
      const error = 'error'

      this.set('error', error)

      this.render(hbs`
        {{frost-text
          class=error
        }}
      `)

      expect(
        this.$('.frost-text').hasClass('error'),
        'error class is set'
      ).to.be.true
    })

    it('only renders the clear icon in insert', function () {
      this.render(hbs`
        {{frost-text}}
      `)

      run(() => this.$('input').val('Test').trigger('input'))

      expect(
        this.$('.frost-text').hasClass('is-clear-visible'),
        'class "is-clear-visible" is set'
      ).to.be.true

      expect(
        this.$('.frost-text').hasClass('is-clear-enabled'),
        'class "is-clear-enabled" is set'
      ).to.be.true
    })

    it('text cleared on button click', function () {
      this.render(hbs`
        {{frost-text
          value="Test"
        }}
      `)

      run(() => this.$('input').focus().val('').trigger('input'))

      expect(
        this.$('input').val()
      ).to.eql('')
    })

    it('hook attr grabs frost-text as expected', function () {
      this.render(hbs`
          {{frost-text 
            hook='my-text'
          }}
      `)

      expect(
        $hook('my-text-input').hasClass('frost-text-input'),
        'input hook is set'
      ).to.be.true

      expect(
        $hook('my-text-clear').hasClass('frost-text-clear'),
        'clear hook is set'
      ).to.be.true
    })

    it('calls onKeyUp closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-text
          onKeyUp=(action 'externalAction')
        }}
      `)

      this.$('input').trigger('keyup')

      expect(
        externalActionSpy.called,
        'onKeyDown closure action called'
      ).to.be.true
    })

    it('calls onInput closure action', function () {
      const externalActionSpy = sinon.spy()
      const testValue = 'Test'

      this.set('value', testValue)
      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-text
          onInput=(action "externalAction")
          value=value
        }}
      `)

      this.$('input').trigger('input')

      const testObj = {
        id: this.$('.frost-text').attr('id'),
        value: testValue
      }

      expect(
        externalActionSpy.args[0][0].id,
        'onInput closure action called with an object that contains the id'
      ).to.eql(testObj.id)

      expect(
        externalActionSpy.args[0][0].value,
        'onInput closure action called with an object that contains the id'
      ).to.eql(testObj.value)
    })
  }
)
