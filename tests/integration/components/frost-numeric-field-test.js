import {expect} from 'chai'
import Ember from 'ember'
const {$, run} = Ember
import {$hook} from 'ember-hook'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'
// import sinon from 'sinon'

// import Component from 'ember-frost-core/components/frost-component'
const test = integration('frost-numeric-field')
describe.only(test.label, function () {
  test.setup()

  describe('when type is set to "number"', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-numeric-field
          hook='myNumericField'
          value=2
          type='number'
        }}
      `)
    })

    it('renders', function () {
      expect(this.$('.frost-numeric-field')).to.have.length(1)
    })
    it('renders', function () {
      this.render(hbs`
          {{frost-numeric-field hook='myNumericField' value='2'}}
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
        this.$('input').hasClass('field-input'),
        'class "field-input" is set'
      ).to.equal(true)
    })
  })

  it('sets align property', function () {
    const align = 'right'

    this.set('align', align)

    this.render(hbs`
        {{frost-numeric-field
          align=align
          value=2
          hook='myNumericField'
        }}
    `)

    expect(
      this.$('input').hasClass(align),
      'class "right" is set'
    ).to.equal(true)
  })
  it('sets autofocus property', function () {
    this.render(hbs`
        {{frost-numeric-field
          value='2'
          autofocus=true
          hook='myNumericField'
        }}
    `)

    expect(
      this.$('input').prop('autofocus'),
      'autofocus attribute is set'
    ).to.equal(true)
  })

  it('set disabled property', function () {
    this.render(hbs`
      {{frost-numeric-field
        value=2
        disabled=true
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
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
      {{frost-numeric-field
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
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
      {{frost-numeric-field
        value=2
        hook='myNumericField'
        title=title
      }}
    `)

    expect(
      this.$('input').prop('title'),
      'title attribute is set'
    ).to.eql(title)
  })

  it('only renders the arrow buttons when isIncrementControlVisible is true', function () {
    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        isIncrementControlVisible=false
        value=2}}
    `)

    expect(this.$('input').hasClass('arrow-visible'),
    'class "arrow-visible" is set'
  ).to.equal(false)

    expect($hook('myNumericField-button').find('frost-numeric-field-container')).to.have.length(0)

    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        isIncrementControlVisible=true
        value=2}}
    `)

    expect(this.$('input').hasClass('arrow-visible'),
    'class "arrow-visible" is set'
    ).to.equal(true)

    expect($hook('myNumericField-button')).to.have.class('frost-numeric-field-container')
  })

  it('renders the errorMessage when user enters invalid character', function (done) {
    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        allowNegativeValues=false
        value=2}}
    `)
    run(() => this.$('input').trigger({type: 'keypress', keyCode: 65, which: 65, charCode: 65}))
    expect($hook('myNumericField-error')).to.have.class('frost-numeric-select-error')
    done()
  })

  it('renders the custom errorMessage if it is defined', function (done) {
    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        allowNegativeValues=false
        value=2
        errorMessage='Error!'}}
    `)
    run(() => this.$('input').trigger({type: 'keypress', keyCode: 65, which: 65, charCode: 65}))
    expect($hook('myNumericField-error')).to.have.class('frost-numeric-select-error')
    done()
  })

  it('renders the errorMessage when value is a number with a period at the end after input field lost focus'
  , function () {
    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        allowNegativeValues=false
        value=2}}
    `)
    run(() => this.$('input').val('2.').trigger('input').blur())
    expect($hook('myNumericField-error')).to.have.class('frost-numeric-select-error')
  })

  it('Disable buttons when value is null'
  , function () {
    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        isIncrementControlVisible=true
        value=''}}
    `)
    expect($('.frost-numeric-field-plus-button')).to.have.prop('disabled', true)
  })

  it('Disable decrease button when allowNegativeValues is false and value is zero'
  , function (done) {
    this.render(hbs`
      {{frost-numeric-field
        hook='myNumericField'
        isIncrementControlVisible=true
        allowNegativeValues=false
        value=0}}
    `)
    expect($('.frost-numeric-field-minus-button')).to.have.prop('disabled', true)
    done()
  })
})
