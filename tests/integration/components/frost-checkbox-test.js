import {expect} from 'chai'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {describe, it} from 'mocha'
import sinon from 'sinon'

const test = integration('frost-checkbox')
describe(test.label, function () {
  test.setup()

  it('should render default values', function () {
    this.render(hbs`
      {{frost-checkbox hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').hasClass('small'),
      'Has class "small"'
    ).to.equal(true)

    expect(
      this.$('.frost-checkbox').find('label').prop('for'),
      '"label for" property has the correct value'
    ).to.eql(
      this.$('.frost-checkbox').find('input').prop('id')
    )

    expect(
      this.$('.frost-checkbox').find('label').prop('tabIndex'),
      'label tabindex set to 0'
    ).to.eql(0)
  })

  it('should set size class correctly', function () {
    this.set('size', 'medium')

    this.render(hbs`
      {{frost-checkbox hook='myCheckbox' size=size}}
    `)

    expect(
      this.$('.frost-checkbox').hasClass('medium'),
      'Has class "medium"'
    ).to.equal(true)

    this.set('size', 'large')

    expect(
      this.$('.frost-checkbox').hasClass('large'),
      'Has class "large"'
    ).to.equal(true)
  })

  it('should set checked state property to input', function () {
    this.render(hbs`
      {{frost-checkbox hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').find('input').prop('checked'),
      'Rendered input is not checked'
    ).to.equal(false)

    this.render(hbs`
      {{frost-checkbox checked=true hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').find('input').prop('checked'),
      'Rendered input is checked'
    ).to.equal(true)
  })

  it('should set error class correctly', function () {
    this.render(hbs`
      {{frost-checkbox hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').hasClass('error'),
      'Initially does not have class "error"'
    ).to.equal(false)

    this.render(hbs`
      {{frost-checkbox class="error" hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').hasClass('error'),
      'Has class "error"'
    ).to.equal(true)
  })

  it('should set disabled state property to input', function () {
    this.render(hbs`
      {{frost-checkbox hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').find('input').prop('disabled'),
      'Rendered input is initially enabled'
    ).to.equal(false)

    this.render(hbs`
      {{frost-checkbox disabled=true hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').find('input').prop('disabled'),
      'Rendered input is disabled'
    ).to.equal(true)
  })

  it('should render label when it is set', function () {
    this.render(hbs`
      {{frost-checkbox hook='myCheckbox'}}
    `)

    expect(
      this.$('.frost-checkbox').find('label').text().trim(),
      'The "label" property text is not set'
    ).to.eql('')

    this.render(hbs`
      {{frost-checkbox hook='myCheckbox' label="lorem ipsum"}}
    `)

    expect(
      this.$('.frost-checkbox').find('label').text().trim(),
      'The "label" property text was set'
    ).to.eql('lorem ipsum')
  })

  it('should trigger value change', function () {
    this.set('checkbox-value', false)
    this.on('valueChange', function (attrs) {
      this.set('checkbox-value', attrs.value)
    })
    this.render(hbs`{{frost-checkbox
      hook='myCheckbox'
      id="value"
      value="value"
      onInput=(action 'valueChange')
      label='value'}}
    `)

    let input = this.$('input')
    input.trigger('click')

    return wait()
      .then(() => {
        expect(this.get('checkbox-value')).to.eql(true)
        input = null
      })
  })

  describe('should call onInput closure action', function () {
    it('should have an object with id set to value', function () {
      const externalActionSpy = sinon.spy()
      const testValue = 'test'

      this.set('testValue', testValue)

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-checkbox
          hook='myCheckbox'
          onInput=(action 'externalAction')
          value=testValue
        }}
      `)

      this.$('input').trigger('click')

      expect(
        externalActionSpy.calledWith({
          id: testValue,
          value: true
        }),
        'onInput() is called with id set to value'
      ).to.equal(true)
    })

    it('should have an object with id set to elementId', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-checkbox
          hook='myCheckbox'
          onInput=(action 'externalAction')
        }}
      `)

      this.$('input').trigger('click')

      expect(
        externalActionSpy.calledWith({
          id: this.$('.frost-checkbox').prop('id'),
          value: true
        }),
        'onInput() is called with id set to value'
      ).to.equal(true)
    })
  })

  it('should call onBlur callback when focus is lost', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-checkbox
        hook='myCheckbox'
        onBlur=(action 'externalAction')
      }}
    `)

    this.$('label').trigger('blur')

    expect(
      externalActionSpy.called,
      'onBlur closure action called'
    ).to.equal(true)
  })

  it('should call onFocus closure action', function () {
    const externalActionSpy = sinon.spy()

    this.on('externalAction', externalActionSpy)

    this.render(hbs`
      {{frost-checkbox
        hook='myCheckbox'
        onFocus=(action 'externalAction')
      }}
    `)

    this.$('input').trigger('focusin')

    expect(
      externalActionSpy.called,
      'onFocus closure action called'
    ).to.equal(true)
  })

  // https://github.com/juwara0/ember-frost-core/issues/1
  it.skip('should set focus on render when autofocus is true', function () {
    const focusSpy = sinon.spy(this.$.prototype, 'focus')

    this.render(hbs`
      {{frost-checkbox
        autofocus=true
        hook='myCheckbox'
      }}
    `)

    expect(
      focusSpy.called,
      'autofocus is set'
    ).to.equal(true)

    this.$.prototype.focus.restore()
  })

  it('should render using spread', function () {
    this.render(hbs`
      {{frost-checkbox
        options=(hash
          checked=true
          hook='myCheckbox'
        )
      }}
    `)

    expect(
      this.$('.frost-checkbox').hasClass('small'),
      'Has class "small"'
    ).to.equal(true)

    expect(
      this.$('.frost-checkbox').find('label').prop('for'),
      '"label for" property has the correct value'
    ).to.eql(
      this.$('.frost-checkbox').find('input').prop('id')
    )

    expect(
      this.$('.frost-checkbox').find('label').prop('tabIndex'),
      'label tabindex set to 0'
    ).to.eql(0)

    expect(
      this.$('.frost-checkbox').find('input').prop('checked'),
      'Rendered input is checked'
    ).to.equal(true)
  })
})
