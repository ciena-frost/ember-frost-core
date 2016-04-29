import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'

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
        this.$('>:first-child').hasClass('frost-checkbox'),
        'Has class "frost-checkbox"'
      ).to.be.true

      expect(
        this.$('>:first-child').hasClass('small'),
        'Has class "small"'
      ).to.be.true

      expect(
        this.$('>:first-child').find('label').hasClass('label'),
        'Has class "label"'
      ).to.be.true

      expect(
        this.$('>:first-child').find('label').prop('for'),
        this.$('>:first-child').find('input').prop('id'),
        '"label for" property has the correct value'
      )

      expect(
        this.$('>:first-child').find('label').attr('tabIndex'),
        'label tabindex set to "0"'
      ).to.eql('0')

      expect(this.$('>:first-child').find('svg'),
        'svg tag exists'
      ).to.have.length(1)
    })

    it('sets size class correctly', function () {
      this.set('size', 'medium')

      this.render(hbs`
        {{frost-checkbox size=size}}
      `)

      expect(
        this.$('>:first-child').hasClass('medium'),
        'Has class "medium"'
      ).to.be.true

      this.set('size', 'large')

      expect(
        this.$('>:first-child').hasClass('large'),
        'Has class "large"'
      ).to.be.true
    })

    it('sets checked state property to input', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('>:first-child').find('input').prop('checked'),
        'Rendered input is not checked'
      ).to.be.false

      this.render(hbs`
        {{frost-checkbox checked=true}}
      `)

      expect(
        this.$('>:first-child').find('input').prop('checked'),
        'Rendered input is checked'
      ).to.be.true
    })

    it('sets error class correctly', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('>:first-child').hasClass('error'),
        'Initially does not have class "error"'
      ).to.be.false

      this.render(hbs`
        {{frost-checkbox class="error"}}
      `)

      expect(
        this.$('>:first-child').hasClass('error'),
        'Has class "error"'
      ).to.be.true
    })

    it('sets disabled state property to input', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('>:first-child').find('input').prop('disabled'),
        'Rendered input is initially enabled'
      ).to.be.false

      this.render(hbs`
        {{frost-checkbox disabled=true}}
      `)

      expect(
        this.$('>:first-child').find('input').prop('disabled'),
        'Rendered input is disabled'
      ).to.be.true
    })

    it('renders label when it is set', function () {
      this.render(hbs`
        {{frost-checkbox}}
      `)

      expect(
        this.$('>:first-child').find('label').text().trim(),
        'The "label" property text is not set'
      ).to.eql('')

      this.render(hbs`
        {{frost-checkbox label="lorem ipsum"}}
      `)

      expect(
        this.$('>:first-child').find('label').text().trim(),
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
      Ember.run.next(this, () => {
        expect(this.get('checkbox-value')).to.eql(true)
      })
    })

    // TODO: figure out why action is called more than once in test
    it('calls onBlur callback when focus is lost', function (done) {
      let called = false

      this.on('test-action', function () {
        if (!called) {
          expect(
            true,
            'The onBlur closure action was called'
          ).to.be.ok
          called = true
          done()
        }
      })

      this.render(hbs`{{frost-checkbox onBlur=(action "test-action")}}`)
      this.$('label').trigger('blur')
    })

    // TODO: test onFocus once we can figure out how
  }
)
