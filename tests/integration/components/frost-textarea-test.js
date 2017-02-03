import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {$hook} from 'ember-hook'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'
import sinon from 'sinon'

import {integration} from 'dummy/tests/helpers/ember-test-utils/setup-component-test'

const test = integration('frost-textarea')
describe(test.label, function () {
  test.setup()

  it('renders default values', function () {
    this.render(hbs`
      {{frost-textarea hook='myTextarea'}}
    `)

    expect(
      this.$('textarea').prop('tabindex'),
      'tabindex is set'
    ).to.eql(0)

    expect(
      this.$('textarea').hasClass('frost-textarea-input'),
      'class "frost-textarea-input" is set'
    ).to.equal(true)

    expect(
      this.$('.frost-textarea-clear'),
      'class "frost-textarea-clear" is set'
    ).to.have.length(1)
  })

  it('sets autofocus property', function () {
    this.render(hbs`
      {{frost-textarea
        autofocus=true
        hook='myTextarea'
      }}
   `)

    expect(
      this.$('textarea').prop('autofocus'),
      'autofocus attribute is set'
    ).to.equal(true)
  })

  it('sets disabled property', function () {
    this.render(hbs`
      {{frost-textarea
        disabled=true
        hook='myTextarea'
      }}
   `)

    expect(
      this.$('textarea').prop('disabled'),
      'disabled attribute is set'
    ).to.equal(true)
  })

  it('sets readonly property', function () {
    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
        readonly=true
      }}
   `)

    expect(
      this.$('textarea').prop('readonly'),
      'readonly attribute is set'
    ).to.equal(true)
  })

  it('sets cols property', function () {
    const cols = 20

    this.set('cols', cols)

    this.render(hbs`
      {{frost-textarea
        cols=cols
        hook='myTextarea'
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
        hook='myTextarea'
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
        hook='myTextarea'
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
        hook='myTextarea'
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
        hook='myTextarea'
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
        hook='myTextarea'
        onFocus=(action 'externalAction')
      }}
    `)

    this.$('textarea').trigger('focusin')

    expect(
      externalActionSpy.called,
      'onFocus closure action called'
    ).to.equal(true)
  })

  it('calls onInput closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
        onInput=(action 'externalAction')
      }}
    `)

    this.$('textarea').trigger('input')

    expect(
      externalActionSpy.called,
      'onInput closure action called'
    ).to.equal(true)
  })

  it('calls onBlur closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
        onBlur=(action 'externalAction')
      }}
    `)

    this.$('textarea').trigger('focusout')

    expect(
      externalActionSpy.called,
      'onBlur closure action called'
    ).to.equal(true)
  })

  it('hook attr grabs frost-textarea-input as expected', function () {
    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
      }}
    `)

    expect(
      $hook('myTextarea-input').hasClass('ember-text-area'),
      'input hook is set'
    ).to.equal(true)
  })

  it('hook attr grabs frost-textarea-clear as expected', function () {
    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
        value='Test'
      }}
    `)

    expect(
      $hook('myTextarea-clear').hasClass('frost-textarea-clear'),
      'clear hook is set'
    ).to.equal(true)
  })

  it('only renders the clear icon in insert', function () {
    this.render(hbs`
      {{frost-textarea hook='myTextarea'}}
    `)

    expect(
      this.$('.frost-textarea').hasClass('is-clear-visible'),
      'class "is-clear-visible" is not set'
    ).to.equal(false)

    expect(
      this.$('.frost-textarea').hasClass('is-clear-enabled'),
      'class "is-clear-enabled" is not set'
    ).to.equal(false)

    run(() => this.$('textarea').val('Test').trigger('input'))

    expect(
      this.$('.frost-textarea').hasClass('is-clear-visible'),
      'class "is-clear-visible" is set'
    ).to.equal(true)

    expect(
      this.$('.frost-textarea').hasClass('is-clear-enabled'),
      'class "is-clear-enabled" is set'
    ).to.equal(true)
  })

  it('runs clear() which clears the input value', function () {
    this.render(hbs`
      {{frost-textarea hook='myTextarea'}}
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
    ).to.equal(true)

    expect(
      $hook('my-text-clear').hasClass('frost-textarea-clear'),
      'clear hook is set'
    ).to.equal(true)
  })

  it('calls onKeyUp closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
        onKeyUp=(action 'externalAction')
      }}
    `)

    this.$('textarea').trigger('keyup')

    expect(
      externalActionSpy.called,
      'onKeyUp closure action called'
    ).to.equal(true)
  })

  it('calls onInput closure action', function () {
    const externalActionSpy = sinon.spy()
    const testValue = 'Test'

    this.set('value', testValue)
    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-textarea
        hook='myTextarea'
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

  it('renders using spread', function () {
    this.render(hbs`
      {{frost-textarea
        options=(hash
          disabled=true
          hook='myTextarea'
        )
      }}
   `)

    expect(
      this.$('textarea').prop('disabled'),
      'disabled attribute is set'
    ).to.equal(true)
  })
})
