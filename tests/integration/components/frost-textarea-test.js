import Ember from 'ember'
const {run} = Ember
import {expect} from 'chai'
import {describeComponent, it} from 'ember-mocha'
import {beforeEach} from 'mocha'
import hbs from 'htmlbars-inline-precompile'
import {$hook, initialize} from 'ember-hook'

describeComponent(
  'frost-textarea',
  'Integration: FrostTextAreaComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      this.render(hbs`
        {{frost-textarea}}
      `)

      expect(
        this.$('textarea').attr('autofocus'),
        'autofocus is set'
      ).to.be.false

      expect(
        this.$('textarea').attr('disabled'),
        'disabled is set'
      ).to.be.false

      expect(
        this.$('textarea').attr('readonly'),
        'readonly is set'
      ).to.be.false

      expect(
        this.$('textarea').attr('tabindex'),
        'tabindex is set'
      ).to.eql('0')
    })

    it('sets autofocus property', function () {
      this.render(hbs`
        {{frost-textarea
          autofocus=true
        }}
     `)

      expect(
        this.$('textarea').attr('autofocus'),
        'autofocus attribute is set'
      ).to.eql('autofocus')
    })

    it('sets disabled property', function () {
      this.render(hbs`
        {{frost-textarea
          disabled=true
        }}
     `)

      expect(
        this.$('textarea').attr('disabled'),
        'disabled attribute is set'
      ).to.eql('disabled')
    })

    it('sets readonly property', function () {
      this.render(hbs`
        {{frost-textarea
          readonly=true
        }}
     `)

      expect(
        this.$('textarea').attr('readonly'),
        'readonly attribute is set'
      ).to.eql('readonly')
    })

    it('sets cols property', function () {
      this.render(hbs`
        {{frost-textarea
          cols='0'
        }}
     `)

      expect(
        this.$('textarea').attr('cols'),
        'cols attribute is set to 0'
      ).to.eql('0')
    })

    it('sets tabindex', function () {
      this.render(hbs`
        {{frost-textarea
          tabindex='-1'
        }}
      `)

      expect(
        this.$('textarea').attr('tabindex'),
        'tabindex is set to "-1"'
      ).to.eql('-1')
    })

    it('sets rows property', function () {
      this.render(hbs`
        {{frost-textarea
          rows='0'
        }}
     `)

      expect(
        this.$('textarea').attr('rows'),
        'rows attribute is set to 0'
      ).to.eql('0')
    })

    it('sets placeholder property', function () {
      this.render(hbs`
        {{frost-textarea
          placeholder='placeholder'
        }}
     `)

      expect(
        this.$('textarea').attr('placeholder'),
        'placeholder attribute is set'
      ).to.eql('placeholder')
    })

    it('sets value', function () {
      this.render(hbs`
        {{frost-textarea
          value='Test'
        }}
     `)

      expect(
        this.$('textarea').val(),
        'value is set'
      ).to.eql('Test')
    })

    it('hook attr grabs frost-textarea-input as expected', function () {
      this.render(hbs`
        {{frost-textarea 
          hook='my-textarea'
        }}
      `)

      expect(
        $hook('my-textarea-input').hasClass('ember-text-area'),
        'input hook is set'
      ).to.be.true
    })

    it('hook attr grabs frost-textarea-clear as expected', function () {
      this.render(hbs`
        {{frost-textarea 
          hook='my-textarea'
          value='Test'
        }}
      `)

      expect(
        $hook('my-textarea-clear').hasClass('frost-textarea-clear'),
        'clear hook is set'
      ).to.be.true
    })

    it('textarea cleared on button click', function () {
      this.render(hbs`
        {{frost-textarea 
          value="Test"
        }}
      `)

      run(() => this.$('.frost-textarea-clear').click())

      expect(
        this.$('textarea').val()
      ).to.eql('')
    })
  }
)
