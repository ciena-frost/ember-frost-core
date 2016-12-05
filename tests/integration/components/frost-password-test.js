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

describeComponent(
  'frost-password',
  'Integration: FrostPasswordComponent',
  {
    integration: true
  },
  function () {
    it('renders default values', function () {
      this.render(hbs`
        {{frost-password}}
      `)

      expect(
        this.$('.frost-password').find('input').prop('tabIndex'),
        'input tabindex set to 0'
      ).to.eql(0)

      expect(
        this.$('.frost-password').find('input').prop('type'),
        'type set to "password"'
      ).to.eql('password')

      expect(
        this.$('.frost-password-input'),
        'class frost-password-input is set'
      ).to.have.length(1)
    })

    it('sets autofocus property', function () {
      this.render(hbs`
        {{frost-password
          autofocus=true
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('autofocus'),
        'autofocus is set'
      ).to.equal(true)
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{frost-password
          disabled=true
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('disabled'),
        'disabled is set'
      ).to.equal(true)
    })

    describe('hook property', function () {
      it('grabs frost-password as expected', function () {
        this.render(hbs`
          {{frost-password
            hook='myPassword'
          }}
        `)

        expect(
          $hook('myPassword-input').hasClass('frost-text-input'),
          'input hook is set'
        ).to.equal(true)

        expect(
          $hook('myPassword-clear').hasClass('frost-text-clear'),
          'clear hook is set'
        ).to.equal(true)
      })

      it('grabs frost-password-reveal as expected', function () {
        this.render(hbs`
          {{frost-password
            hook='myPassword'
            revealable=true
          }}
        `)

        expect(
          $hook('myPassword-reveal').hasClass('frost-password-reveal'),
          'reveal hook is set'
        ).to.equal(true)
      })
    })

    it('sets maxlength property', function () {
      const maxlength = 30

      this.set('maxlength', maxlength)

      this.render(hbs`
        {{frost-password
          maxlength=maxlength
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('maxlength'),
        'maxlength is set'
      ).to.eql(maxlength)
    })

    it('sets placeholder property', function () {
      const placeholder = 'Enter your password'

      this.set('placeholder', placeholder)

      this.render(hbs`
        {{frost-password
          placeholder=placeholder
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('placeholder'),
        'placeholder is set'
      ).to.eql(placeholder)
    })

    it('sets readonly property', function () {
      this.render(hbs`
        {{frost-password
          readonly=true
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('readonly'),
        'readonly is set'
      ).to.equal(true)
    })

    it('sets required property', function () {
      this.render(hbs`
        {{frost-password
          required=true
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('required'),
        'required is set'
      ).to.equal(true)
    })

    describe('revealable property', function () {
      it('sets revealable class and text to "Show"', function () {
        this.render(hbs`
          {{frost-password
            revealable=true
          }}
       `)

        expect(
          this.$('.frost-password').hasClass('revealable'),
          'revealable class is set'
        ).to.equal(true)

        expect(
          this.$('.frost-password-reveal').text().trim(),
          'reveal text is set to "Show"'
        ).to.eql('Show')
      })

      it('changes text to "Hide" upon click and type="text"', function () {
        this.render(hbs`
          {{frost-password
            revealable=true
          }}
       `)

        this.$('.frost-password-reveal').trigger('click')

        expect(
          this.$('.frost-password-reveal').text().trim(),
          'reveal text is set to "Hide"'
        ).to.eql('Hide')

        expect(
        this.$('.frost-password').find('input').prop('type'),
        'type set to "text"'
      ).to.eql('text')
      })
    })

    it('sets tabindex property', function () {
      const tabindex = -1

      this.set('tabindex', tabindex)

      this.render(hbs`
        {{frost-password
          tabindex=tabindex
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('tabindex'),
        'tabindex is set'
      ).to.eql(tabindex)
    })

    it('sets title property', function () {
      const title = 'Enter your password'

      this.set('title', title)

      this.render(hbs`
        {{frost-password
          title=title
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('title'),
        'title is set'
      ).to.eql(title)
    })

    it('sets value property', function () {
      const value = 'test value'

      this.set('value', value)

      this.render(hbs`
        {{frost-password
          value=value
        }}
     `)

      expect(
        this.$('.frost-password').find('input').val(),
        'value is set'
      ).to.eql(value)
    })

    it('renders using spread', function () {
      this.render(hbs`
        {{frost-password
          options=(hash
            disabled=true
          )
        }}
     `)

      expect(
        this.$('.frost-password').find('input').prop('disabled'),
        'disabled is set'
      ).to.equal(true)
    })
  }
)
