import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {$hook, initialize} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-textarea',
  'Integration: FrostTextAreaComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders default values', function () {
      this.render(hbs`
        {{frost-textarea}}
      `)

      expect(
        this.$('textarea').prop('tabindex'),
        'tabindex is set'
      ).to.eql(0)

      expect(
        this.$('textarea').hasClass('frost-textarea-input'),
        'class "frost-textarea-input" is set'
      ).to.be.true

      expect(
        this.$('.frost-textarea-clear'),
        'class "frost-textarea-clear" is set'
      ).to.have.length(1)
    })

    it('sets autofocus property', function () {
      this.render(hbs`
        {{frost-textarea
          autofocus=true
        }}
     `)

      expect(
        this.$('textarea').prop('autofocus'),
        'autofocus attribute is set'
      ).to.be.true
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{frost-textarea
          disabled=true
        }}
     `)

      expect(
        this.$('textarea').prop('disabled'),
        'disabled attribute is set'
      ).to.be.true
    })

    it('sets readonly property', function () {
      this.render(hbs`
        {{frost-textarea
          readonly=true
        }}
     `)

      expect(
        this.$('textarea').prop('readonly'),
        'readonly attribute is set'
      ).to.be.true
    })

    it('sets cols property', function () {
      const cols = 20

      this.set('cols', cols)

      this.render(hbs`
        {{frost-textarea
          cols=cols
        }}
     `)

      expect(
        this.$('textarea').prop('cols'),
        'cols attribute is set'
      ).to.eql(cols)
    })

    it('sets tabindex', function () {
      const tabindex = -1

      this.set('tabindex', tabindex)

      this.render(hbs`
        {{frost-textarea
          tabindex=tabindex
        }}
      `)

      expect(
        this.$('textarea').prop('tabindex'),
        'tabindex is set'
      ).to.eql(tabindex)
    })

    it('sets rows property', function () {
      const rows = 20

      this.set('rows', rows)

      this.render(hbs`
        {{frost-textarea
          rows=rows
        }}
     `)

      expect(
        this.$('textarea').prop('rows'),
        'rows attribute is set'
      ).to.eql(rows)
    })

    it('sets placeholder property', function () {
      const placeholder = 'placeholder'

      this.set('placeholder', placeholder)

      this.render(hbs`
        {{frost-textarea
          placeholder=placeholder
        }}
     `)

      expect(
        this.$('textarea').prop('placeholder'),
        'placeholder attribute is set'
      ).to.eql(placeholder)
    })

    it('sets value', function () {
      const value = 'Test'

      this.set('value', value)

      this.render(hbs`
        {{frost-textarea
          value=value
        }}
     `)

      expect(
        this.$('textarea').val(),
        'value is set'
      ).to.eql(value)
    })

    it('calls onFocus closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onFocus=(action 'externalAction')
        }}
      `)

      this.$('textarea').trigger('focusin')

      expect(
        externalActionSpy.called,
        'onFocus closure action called'
      ).to.be.true
    })

    it('calls onInput closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onInput=(action 'externalAction')
        }}
      `)

      this.$('textarea').trigger('input')

      expect(
        externalActionSpy.called,
        'onInput closure action called'
      ).to.be.true
    })

    it('calls onBlur closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onBlur=(action 'externalAction')
        }}
      `)

      this.$('textarea').trigger('focusout')

      expect(
        externalActionSpy.called,
        'onBlur closure action called'
      ).to.be.true
    })

    it('hook attr grabs frost-textarea-input as expected', function () {
      this.render(hbs`
        {{frost-textarea 
          hook='my-textarea'
        }}
      `)

      expect(
        $hook('my-textarea-input').hasClass('ember-text-area'),
        'input hook is set'
      ).to.be.true
    })

    it('hook attr grabs frost-textarea-clear as expected', function () {
      this.render(hbs`
        {{frost-textarea 
          hook='my-textarea'
          value='Test'
        }}
      `)

      expect(
        $hook('my-textarea-clear').hasClass('frost-textarea-clear'),
        'clear hook is set'
      ).to.be.true
    })

    it('only renders the clear icon in insert', function () {
      this.render(hbs`
        {{frost-textarea}}
      `)

      expect(
        this.$('.frost-textarea').hasClass('is-clear-visible'),
        'class "is-clear-visible" is not set'
      ).to.be.false

      expect(
        this.$('.frost-textarea').hasClass('is-clear-enabled'),
        'class "is-clear-enabled" is not set'
      ).to.be.false

      run(() => this.$('textarea').val('Test').trigger('input'))

      expect(
        this.$('.frost-textarea').hasClass('is-clear-visible'),
        'class "is-clear-visible" is set'
      ).to.be.true

      expect(
        this.$('.frost-textarea').hasClass('is-clear-enabled'),
        'class "is-clear-enabled" is set'
      ).to.be.true
    })

    it('runs clear() which clears the input value', function () {
      this.render(hbs`
        {{frost-textarea}}
      `)

      run(() => {
        this.$('textarea').val('Test').trigger('input')
        this.$('.frost-textarea-clear').trigger('click')
      })

      expect(
        this.$('textarea').val(),
        'input value cleared'
      ).to.eql('')
    })

    it('hook attr grabs frost-textarea as expected', function () {
      this.render(hbs`
          {{frost-textarea
            hook='my-text'
          }}
      `)

      expect(
        $hook('my-text-input').hasClass('frost-textarea-input'),
        'input hook is set'
      ).to.be.true

      expect(
        $hook('my-text-clear').hasClass('frost-textarea-clear'),
        'clear hook is set'
      ).to.be.true
    })

    it('calls onKeyUp closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onKeyUp=(action 'externalAction')
        }}
      `)

      this.$('textarea').trigger('keyup')

      expect(
        externalActionSpy.called,
        'onKeyUp closure action called'
      ).to.be.true
    })

    it('calls onInput closure action', function () {
      const externalActionSpy = sinon.spy()
      const testValue = 'Test'

      this.set('value', testValue)
      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onInput=(action "externalAction")
          value=value
        }}
      `)

      this.$('textarea').trigger('input')

      expect(
        externalActionSpy.args[0][0].id,
        'onInput closure action called with an object that contains the id'
      ).to.eql(this.$('.frost-textarea').prop('id'))

      expect(
        externalActionSpy.args[0][0].value,
        'onInput closure action called with an object that contains the value'
      ).to.eql(testValue)
    })
  }
)
