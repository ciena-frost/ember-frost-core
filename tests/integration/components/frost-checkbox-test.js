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

describeComponent(
  'frost-checkbox',
  'Integration: FrostCheckboxComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('.frost-checkbox').hasClass('small'),
        'Has class "small"'
      ).to.be.true

      expect(
        this.$('.frost-checkbox').find('label').prop('for'),
        '"label for" property has the correct value'
      ).to.eql(
        this.$('.frost-checkbox').find('input').prop('id')
      )

      expect(
        this.$('.frost-checkbox').find('label').attr('tabIndex'),
        'label tabindex set to "0"'
      ).to.eql('0')
    })

    it('sets size class correctly', function () {
      this.set('size', 'medium')

      this.render(hbs`
        {{frost-checkbox size=size}}
      `)

      expect(
        this.$('.frost-checkbox').hasClass('medium'),
        'Has class "medium"'
      ).to.be.true

      this.set('size', 'large')

      expect(
        this.$('.frost-checkbox').hasClass('large'),
        'Has class "large"'
      ).to.be.true
    })

    it('sets checked state property to input', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('.frost-checkbox').find('input').prop('checked'),
        'Rendered input is not checked'
      ).to.be.false

      this.render(hbs`
        {{frost-checkbox checked=true}}
      `)

      expect(
        this.$('.frost-checkbox').find('input').prop('checked'),
        'Rendered input is checked'
      ).to.be.true
    })

    it('sets error class correctly', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('.frost-checkbox').hasClass('error'),
        'Initially does not have class "error"'
      ).to.be.false

      this.render(hbs`
        {{frost-checkbox class="error"}}
      `)

      expect(
        this.$('.frost-checkbox').hasClass('error'),
        'Has class "error"'
      ).to.be.true
    })

    it('sets disabled state property to input', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('.frost-checkbox').find('input').prop('disabled'),
        'Rendered input is initially enabled'
      ).to.be.false

      this.render(hbs`
        {{frost-checkbox disabled=true}}
      `)

      expect(
        this.$('.frost-checkbox').find('input').prop('disabled'),
        'Rendered input is disabled'
      ).to.be.true
    })

    it('renders label when it is set', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('.frost-checkbox').find('label').text().trim(),
        'The "label" property text is not set'
      ).to.eql('')

      this.render(hbs`
        {{frost-checkbox label="lorem ipsum"}}
      `)

      expect(
        this.$('.frost-checkbox').find('label').text().trim(),
        'The "label" property text was set'
      ).to.eql('lorem ipsum')
    })

    it('triggers value change', function () {
      this.set('checkbox-value', '')
      this.on('valueChange', function (val) {
        this.set('checkbox-value', val)
      })
      this.render(hbs`{{#frost-checkbox
        id="value"
        value="value"
        on-input=(action "valueChange")}}value{{/frost-checkbox}}
      `)
      var input = this.$('input')
      input.trigger('input')
      run.next(this, () => {
        expect(this.get('checkbox-value')).to.eql(true)
      })
    })

    describe('calls onInput closure action', function () {
      it('has an object with id set to value', function () {
        const externalActionSpy = sinon.spy()
        const testValue = 'test'

        this.set('testValue', testValue)

        this.on('externalAction', externalActionSpy)

        this.render(hbs`
          {{frost-checkbox
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
        ).to.be.true
      })

      it('has an object with id set to elementId', function () {
        const externalActionSpy = sinon.spy()

        this.on('externalAction', externalActionSpy)

        this.render(hbs`
          {{frost-checkbox
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
        ).to.be.true
      })
    })

    it('calls onBlur callback when focus is lost', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-checkbox
          onBlur=(action 'externalAction')
        }}
      `)

      this.$('label').trigger('blur')

      expect(
        externalActionSpy.called,
        'onBlur closure action called'
      ).to.be.true
    })

    it('calls onFocus closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-checkbox
          onFocus=(action 'externalAction')
        }}
      `)

      this.$('input').trigger('focusin')

      expect(
        externalActionSpy.called,
        'onFocus closure action called'
      ).to.be.true
    })

    // https://github.com/juwara0/ember-frost-core/issues/1
    it.skip('sets focus on render when autofocus is true', function () {
      const focusSpy = sinon.spy(this.$.prototype, 'focus')

      this.render(hbs`
        {{frost-checkbox
          autofocus=true
        }}
      `)

      expect(
        focusSpy.called,
        'autofocus is set'
      ).to.be.true

      this.$.prototype.focus.restore()
    })
  }
)
