import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import {$hook, initialize} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach} from 'mocha'
import sinon from 'sinon'

describeComponent(
  'frost-text',
  'Integration: FrostTextComponent',
  {
    integration: true
  },
  function () {
    beforeEach(function () {
      initialize()
    })

    it('renders', function () {
      this.render(hbs`
          {{frost-text}}
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
      ).to.be.true

      expect(
        this.$('input').hasClass('left'),
        'class "left" is set'
      ).to.be.true

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
          }}
      `)

      expect(
        this.$('input').hasClass(align),
        'class "right" is set'
      ).to.be.true
    })

    // "autocapitalize" only works in Chrome and iOS Safari Mobile

    // it('sets autocapitalize property', function () {
    //   this.render(hbs`
    //       {{frost-text
    //         autocapitalize='sentences'
    //       }}
    //   `)

    //   expect(
    //     this.$('input').prop('autocapitalize'),
    //     'autocapitalize attribute is set'
    //   ).to.eql('sentences')
    // })

    // "autocorrect" doesn't pass in Chrome, Safari and Firefox

    // it('sets autocorrect property', function () {
    //   this.render(hbs`
    //       {{frost-text
    //         autocorrect=true
    //       }}
    //   `)

    //   expect(
    //     this.$('input').prop('autocorrect'),
    //     'autocorrect attribute is set'
    //   ).to.be.true
    // })

    it('sets autofocus property', function () {
      this.render(hbs`
          {{frost-text
            autofocus=true
          }}
      `)

      expect(
        this.$('input').prop('autofocus'),
        'autofocus attribute is set'
      ).to.be.true
    })

    it('set disabled property', function () {
      this.render(hbs`
        {{frost-text
          disabled=true
        }}
      `)

      expect(
        this.$('input').prop('disabled'),
        'disabled attribute is set'
      ).to.be.true
    })

    it('sets maxlength property', function () {
      const maxlength = 30

      this.set('maxlength', maxlength)

      this.render(hbs`
        {{frost-text
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
          readonly=true
        }}
      `)

      expect(
        this.$('input').prop('readonly'),
        'readonly attribute is set'
      ).to.be.true
    })

    it('set required property', function () {
      this.render(hbs`
        {{frost-text
          required=true
        }}
      `)

      expect(
        this.$('input').prop('required'),
        'required attribute is set'
      ).to.be.true
    })

    it('set spellcheck property', function () {
      this.render(hbs`
        {{frost-text
          spellcheck=true
        }}
      `)

      expect(
        this.$('input').prop('spellcheck'),
        'spellcheck attribute is set'
      ).to.be.true
    })

    it('set tabindex property', function () {
      const tabindex = -1

      this.set('tabindex', tabindex)

      this.render(hbs`
        {{frost-text
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
        {{frost-text}}
      `)

      expect(
        this.$('.frost-text').hasClass('is-clear-visible'),
        'class "is-clear-visible" is not set'
      ).to.be.false

      expect(
        this.$('.frost-text').hasClass('is-clear-enabled'),
        'class "is-clear-enabled" is not set'
      ).to.be.false

      run(() => this.$('input').val('Test').trigger('input'))

      expect(
        this.$('.frost-text').hasClass('is-clear-visible'),
        'class "is-clear-visible" is set'
      ).to.be.true

      expect(
        this.$('.frost-text').hasClass('is-clear-enabled'),
        'class "is-clear-enabled" is set'
      ).to.be.true
    })

    it('runs clear() which clears the input value', function () {
      this.render(hbs`
        {{frost-text}}
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

    it('hook attr grabs frost-text as expected', function () {
      this.render(hbs`
          {{frost-text
            hook='my-text'
          }}
      `)

      expect(
        $hook('my-text-input').hasClass('frost-text-input'),
        'input hook is set'
      ).to.be.true

      expect(
        $hook('my-text-clear').hasClass('frost-text-clear'),
        'clear hook is set'
      ).to.be.true
    })

    it('calls onKeyUp closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-text
          onKeyUp=(action 'externalAction')
        }}
      `)

      this.$('input').trigger('keyup')

      expect(
        externalActionSpy.called,
        'onKeyUp closure action called'
      ).to.be.true
    })

    it('calls onInput closure action', function () {
      const externalActionSpy = sinon.spy()
      const testValue = 'Test'

      this.set('value', testValue)
      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-text
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
  }
)
