import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

describeComponent(
  'frost-radio-button-input',
  'Integration: FrostRadioButtonInputComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.set('_setupAssertions', function () {
        return
      })

      this.render(hbs`
        {{frost-radio-button-input
          _setupAssertions=_setupAssertions
        }}
      `)

      expect(
        this.$('.frost-radio-button-input').prop('type'),
        'type is set'
      ).to.eql('radio')
    })

    it('throws error when not in frost-radio-button', function () {
      expect(
        () => {
          this.render(hbs`
            {{frost-radio-button-input}}
          `)
        },
        'assertion thrown when used without frost-radio-group'
      ).to.throw(/frost-radio-button-input/)
    })

    it('sets disabled property', function () {
      this.set('_setupAssertions', function () {
        return
      })

      this.render(hbs`
        {{frost-radio-button-input
          disabled=true
          _setupAssertions=_setupAssertions
        }}
      `)

      expect(
        this.$('.frost-radio-button-input').prop('disabled'),
        'disabled class is set'
      ).to.be.true
    })

    it('sets value property', function () {
      const value = 'test value'

      this.set('value', value)
      this.set('_setupAssertions', function () {
        return
      })

      this.render(hbs`
        {{frost-radio-button-input
          _setupAssertions=_setupAssertions
          value=value
        }}
     `)

      expect(
        this.$('.frost-radio-button-input').prop('value'),
        'value is set'
      ).to.eql(value)
    })

    it('sets checked property', function () {
      this.set('groupValue', 'testValue')
      this.set('value', 'testValue')
      this.set('_setupAssertions', function () {
        return
      })

      this.render(hbs`
        {{frost-radio-button-input
          groupValue=groupValue
          _setupAssertions=_setupAssertions
          value=value
        }}
     `)

      expect(
        this.$('.frost-radio-button-input').prop('checked'),
        'checked is set'
      ).to.be.true
    })
  }
)
