import {expect} from 'chai'
import {$hook} from 'ember-hook'
import wait from 'ember-test-helpers/wait'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

/**
 * @returns {String} the currently selected text
 */
function getSelectedText () {
  return window.getSelection().toString()
}

/**
 * For some reason Ember.$.browser is undefined, so this is another quick check for firefox
 * @returns {Boolean} true if current browser is firefox
 */
function isFirefox () {
  return navigator.userAgent.toLowerCase().indexOf('firefox') !== -1
}

const test = integration('frost-password')
describe(test.label, function () {
  test.setup()

  describe('when rendered with defaults', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-password hook='myPassword'}}
      `)

      return wait()
    })

    it('should default tabindex to 0', function () {
      expect(this.$('.frost-password input')).to.have.prop('tabIndex', 0)
    })

    it('should default type to password', function () {
      expect(this.$('.frost-password input')).to.have.prop('type', 'password')
    })

    it('should include a to frost-password-input', function () {
      expect(this.$('.frost-password .frost-password-input')).to.have.length(1)
    })

    it('should have the proper hook on the inner text input', function () {
      expect($hook('myPassword-input')).to.have.class('frost-text-input')
    })

    it('should have the proper hook on the inner clear button', function () {
      expect($hook('myPassword-clear')).to.have.class('frost-text-clear')
    })
  })

  const inputProps = {
    autofocus: true,
    disabled: true,
    maxlength: 30,
    placeholder: 'Enter your password',
    readonly: true,
    required: true,
    tabindex: -1,
    title: 'Enter your password'
  }

  Object.keys(inputProps).forEach((propName) => {
    const value = inputProps[propName]

    describe(`when "${propName}" is set to [${value}]`, function () {
      beforeEach(function () {
        const options = {
          hook: 'myPasssword'
        }

        options[propName] = value
        this.set('options', options)

        this.render(hbs`
          {{frost-password
            options=options
          }}
        `)

        return wait()
      })

      it(`should set the "${propName}" property on the inner input element`, function () {
        expect(this.$('.frost-password input')).to.have.prop(propName, value)
      })
    })
  })

  describe('when the "value" property is set to "fizzbang"', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-password
          hook='myPassword'
          value='fizzbang'
        }}
      `)

      return wait()
    })

    it('should set the "value" on the inner input element', function () {
      expect($hook('myPassword-input')).to.have.value('fizzbang')
    })
  })

  describe('when revealable is set to true', function () {
    beforeEach(function () {
      this.render(hbs`
        {{frost-password
          hook='myPassword'
          revealable=true
        }}
      `)

      const $input = this.$('.frost-password input')
      $input.val('fizzbang')
      $input.select()

      return wait()
    })

    // For some unknown reason `.select()` isn't working in Firefox
    // Neither the native JS, nor the jQuery method (@job13er 2017-05-09)
    if (!isFirefox()) {
      it('should have obscured password selected', function () {
        expect(getSelectedText()).to.equal('••••••••')
      })
    }

    it('should set proper hook on the revealable button', function () {
      expect($hook('myPassword-reveal')).to.have.class('frost-password-reveal')
    })

    it('should add the "revealable" class', function () {
      expect($hook('myPassword')).to.have.class('revealable')
    })

    it('should set the reveal text to "Show"', function () {
      expect($hook('myPassword-reveal')).to.have.text('Show')
    })

    describe('when reveal is clicked', function () {
      beforeEach(function () {
        $hook('myPassword-reveal').click()
        return wait()
      })

      // For some unknown reason `.select()` isn't working in Firefox
      // Neither the native JS, nor the jQuery method (@job13er 2017-05-09)
      if (!isFirefox()) {
        it('should have plain password selected', function () {
          expect(getSelectedText()).to.equal('fizzbang')
        })
      }

      it('should change the reveal text to "Hide"', function () {
        expect($hook('myPassword-reveal')).to.have.text('Hide')
      })

      it('should change the input type to "text"', function () {
        expect($hook('myPassword-input')).to.have.prop('type', 'text')
      })
    })
  })

  describe('when using spread', function () {
    // NOTE: this looks a little superfluous now, since we're using spread above to DRY up our attribute
    // setting tests, but I wanted to leave it here to make an explicit check for using spread, just in case
    // the above is re-factored at some point (@job13er 2017-05-09)

    beforeEach(function () {
      this.render(hbs`
        {{frost-password
          options=(hash
            disabled=true
            hook='myPassword'
          )
        }}
      `)

      return wait()
    })

    it('should still properly set input properties', function () {
      expect(this.$('.frost-password input')).to.have.prop('disabled', true)
    })
  })
})
