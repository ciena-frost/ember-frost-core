import {run} from '@ember/runloop'
import {expect} from 'chai'
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-text')
describe(test.label, function () {
  test.setup()

  describe('when type is set to "number"', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-text
          hook='myTextInput'
          type='number'
        }}
      `)
    })

    it('renders', function () {
      expect(this.$('.frost-text')).to.have.length(1)
    })
  })

  it('renders', function () {
    this.render(hbs`
        {{frost-text hook='myTextInput'}}
    `)

    expect(
      this.$('input').prop('tabindex'),
      'tabindex is set'
    ).to.eql(0)

    expect(
      this.$('input').prop('type'),
      'type is set'
    ).to.eql('text')

    expect(
      this.$('input').hasClass('frost-text-input'),
      'class "frost-text-input" is set'
    ).to.equal(true)

    expect(
      this.$('input').hasClass('left'),
      'class "left" is set'
    ).to.equal(true)

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
          hook='myTextInput'
        }}
    `)

    expect(
      this.$('input').hasClass(align),
      'class "right" is set'
    ).to.equal(true)
  })

  it('sets autofocus property', function () {
    this.render(hbs`
        {{frost-text
          autofocus=true
          hook='myTextInput'
        }}
    `)

    expect(
      this.$('input').prop('autofocus'),
      'autofocus attribute is set'
    ).to.equal(true)
  })

  it('set disabled property', function () {
    this.render(hbs`
      {{frost-text
        disabled=true
        hook='myTextInput'
      }}
    `)

    expect(
      this.$('input').prop('disabled'),
      'disabled attribute is set'
    ).to.equal(true)
  })

  it('sets maxlength property', function () {
    const maxlength = 30

    this.set('maxlength', maxlength)

    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        maxlength=maxlength
      }}
   `)

    expect(
      this.$('input').prop('maxlength'),
      'maxlength is set'
    ).to.eql(maxlength)
  })

  it('sets placeholder property', function () {
    const placeholder = 'Enter here'

    this.set('placeholder', placeholder)

    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        placeholder=placeholder
      }}
   `)

    expect(
      this.$('input').prop('placeholder'),
      'placeholder is set'
    ).to.eql(placeholder)
  })

  it('sets value property', function () {
    const value = 'Testing'

    this.set('value', value)

    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        value=value
      }}
    `)

    expect(
      this.$('input').val(),
      'value is set'
    ).to.eql(value)
  })

  it('set readonly property', function () {
    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        readonly=true
      }}
    `)

    expect(
      this.$('input').prop('readonly'),
      'readonly attribute is set'
    ).to.equal(true)
  })

  it('set required property', function () {
    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        required=true
      }}
    `)

    expect(
      this.$('input').prop('required'),
      'required attribute is set'
    ).to.equal(true)
  })

  it('set spellcheck property', function () {
    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        spellcheck=true
      }}
    `)

    expect(
      this.$('input').prop('spellcheck'),
      'spellcheck attribute is set'
    ).to.equal(true)
  })

  it('set tabindex property', function () {
    const tabindex = -1

    this.set('tabindex', tabindex)

    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        tabindex=tabindex
      }}
    `)

    expect(
      this.$('input').prop('tabindex'),
      'tabindex attribute is set'
    ).to.eql(tabindex)
  })

  it('set title property', function () {
    const title = 'title'

    this.set('title', title)

    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        title=title
      }}
    `)

    expect(
      this.$('input').prop('title'),
      'title attribute is set'
    ).to.eql(title)
  })

  it('only renders the clear icon in insert', function () {
    this.render(hbs`
      {{frost-text hook='myTextInput'}}
    `)

    expect(
      this.$('.frost-text').hasClass('is-clear-visible'),
      'class "is-clear-visible" is not set'
    ).to.equal(false)

    expect(
      this.$('.frost-text').hasClass('is-clear-enabled'),
      'class "is-clear-enabled" is not set'
    ).to.equal(false)

    run(() => this.$('input').val('Test').trigger('input'))

    expect(
      this.$('.frost-text').hasClass('is-clear-visible'),
      'class "is-clear-visible" is set'
    ).to.equal(true)

    expect(
      this.$('.frost-text').hasClass('is-clear-enabled'),
      'class "is-clear-enabled" is set'
    ).to.equal(true)
  })

  it('runs clear() which clears the input value', function () {
    this.render(hbs`
      {{frost-text hook='myTextInput'}}
    `)

    run(() => {
      this.$('input').val('Test').trigger('input')
      this.$('.frost-text-clear').trigger('click')
    })

    expect(
      this.$('input').val(),
      'input value cleared'
    ).to.eql('')
  })

  describe('when setting the hook property', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-text
          hook='myText'
        }}
      `)
    })

    it('should set the clear hook', function () {
      expect($hook('myText-clear')).to.have.class('frost-text-clear')
    })

    it('should set the input hook', function () {
      expect($hook('myText-input')).to.have.class('frost-text-input')
    })
  })

  it('calls onKeyUp closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-text
        hook='myTextInput'
        onKeyUp=(action 'externalAction')
      }}
    `)

    this.$('input').trigger('keyup')

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
      {{frost-text
        hook='myTextInput'
        onInput=(action "externalAction")
        value=value
      }}
    `)

    this.$('input').trigger('input')

    expect(
      externalActionSpy.args[0][0].id,
      'onInput closure action called with an object that contains the id'
    ).to.eql(this.$('.frost-text').prop('id'))

    expect(
      externalActionSpy.args[0][0].value,
      'onInput closure action called with an object that contains the value'
    ).to.eql(testValue)
  })

  it('renders using spread', function () {
    this.render(hbs`
      {{frost-text
        options=(hash
          disabled=true
          hook='myTextInput'
        )
      }}
    `)

    expect(
      this.$('input').prop('disabled'),
      'disabled attribute is set'
    ).to.equal(true)
  })
})
