import {expect} from 'chai'
import {
  describeComponent,
  it
} from 'ember-mocha'
import {
  describe
} from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {
  $hook
} from 'ember-hook'
import sinon from 'sinon'

describeComponent(
  'frost-toggle',
  'Integration: FrostToggleComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-toggle}}
      `)

      expect(
        this.$('.frost-toggle').find('input').prop('type'),
        'type set to "checkbox"'
      ).to.eql('checkbox')

      expect(
        this.$('.frost-toggle-input'),
        'class frost-toggle-input is set'
      ).to.have.length(1)

      expect(
        this.$('.frost-toggle').find('label').hasClass('frost-toggle-button'),
        'label has class "frost-toggle-button"'
      ).to.equal(true)

      expect(
        this.$('.frost-toggle').find('label').prop('for'),
        '"label for" property has the correct value'
      ).to.eql(
        this.$('.frost-toggle').find('input').prop('id')
      )
    })

    it('throws assertion error', function () {
      expect(
        () => {
          this.render(hbs`
            {{frost-toggle
              trueValue='testValue'
              falseValue='testValue'
            }}
          `)
        },
        'assertion thrown when trueValue and falseValue are same value'
      ).to.throw(/Same value has been assigned/)
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{frost-toggle
          disabled=true
        }}
     `)

      expect(
        this.$('.frost-toggle').find('input').prop('disabled'),
        'disabled is set'
      ).to.equal(true)
    })

    it('sets hook property', function () {
      this.render(hbs`
        {{frost-toggle
          hook='my-test'
        }}
     `)

      expect(
        $hook('my-test-toggle-input').hasClass('frost-toggle-input'),
        'input hook is set'
      ).to.equal(true)

      expect(
        $hook('my-test-toggle-label').hasClass('frost-toggle-button'),
        'label hook is set'
      ).to.equal(true)

      expect(
        $hook('my-test-toggle-text-on').hasClass('frost-toggle-text on'),
        'toggle text on hook is set'
      ).to.equal(true)

      expect(
        $hook('my-test-toggle-text-off').hasClass('frost-toggle-text off'),
        'toggle text off hook is set'
      ).to.equal(true)
    })

    it('sets value property', function () {
      const value = 'test value'

      this.set('value', value)

      this.render(hbs`
        {{frost-toggle
          value=value
        }}
     `)

      expect(
        this.$('.frost-toggle').find('input').val(),
        'value is set'
      ).to.eql('on')
    })

    describe('label is set', function () {
      it('uses trueLabel property', function () {
        this.render(hbs`
          {{frost-toggle
            trueLabel='Label On'
            value='on'
          }}
       `)

        expect(
          this.$('.on').text().trim(),
          'trueLabel is set'
        ).to.eql('Label On')
      })

      it('uses default on label of "On"', function () {
        this.render(hbs`
          {{frost-toggle
            value='on'
          }}
       `)

        expect(
          this.$('.on').text().trim(),
          'default on label is set'
        ).to.eql('On')
      })

      it('uses falseLabel property', function () {
        this.render(hbs`
          {{frost-toggle
            falseLabel='Label Off'
            value='on'
          }}
       `)

        expect(
          this.$('.off').text().trim(),
          'falseLabel is set'
        ).to.eql('Label Off')
      })

      it('uses default off label of "Off"', function () {
        this.render(hbs`
          {{frost-toggle}}
       `)

        expect(
          this.$('.off').text().trim(),
          'default off label is set'
        ).to.eql('Off')
      })
    })

    it('uses trueValue property', function () {
      this.set('testValue', 'enabled')

      this.render(hbs`
          {{frost-toggle
            trueValue='enabled'
            value=testValue
          }}
       `)

      expect(
        this.$('input').prop('checked'),
        'toggle is in "On" state'
      ).to.equal(true)
    })

    it('uses falseValue property', function () {
      this.set('testValue', 'disabled')

      this.render(hbs`
          {{frost-toggle
            falseValue='disabled'
            value=testValue
          }}
       `)

      expect(
        this.$('input').prop('checked'),
        'toggle is in "Off" state'
      ).to.equal(false)
    })

    it('fires onClick closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.set('testValue', 'disabled')

      this.render(hbs`
          {{frost-toggle
            falseValue='disabled'
            value=testValue
            onClick=(action 'externalAction')
          }}
       `)

      this.$('label').click()

      expect(
        externalActionSpy.called,
        'onClick closure action called'
      ).to.equal(true)
    })

    it('renders using spread', function () {
      this.render(hbs`
        {{frost-toggle
          options=(hash
            disabled=true
          )
        }}
     `)

      expect(
        this.$('.frost-toggle').find('input').prop('disabled'),
        'disabled is set'
      ).to.equal(true)
    })
  }
)
