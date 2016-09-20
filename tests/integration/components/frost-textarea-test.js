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
        this.$('textarea').attr('tabindex'),
        'tabindex is set'
      ).to.be.eql('0')
    })

    it('hook attr grabs frost-textarea as expected', function () {
      this.render(hbs`
        {{frost-textarea 
          hook='my-textarea'
        }}
      `)

      expect(
        $hook('my-textarea').hasClass('frost-textarea'),
        'default hook is set'
      ).to.be.true

      expect(
        $hook('my-textarea-input').hasClass('ember-text-area'),
        'input hook is set'
      ).to.be.true
    })
    
    it('calls onInput closure action', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onInput=(action 'externalAction')
        }}
      `)

      run(()=>{
        this.$('textarea').val('test').trigger('input')
      })

      expect(
        externalActionSpy.called,
        'onInput closure action called'
      ).to.be.true
    })
    
    it('textarea cleared on button click', function () {
      this.set('input-value', '')
      this.on('test-action', function (attr) {
        this.set('input-value', attr.value)
      })

      this.render(hbs`{{frost-textarea hook="test" onInput=(action "test-action")}}`)
      run(() => $hook('test-input').val('test').trigger('input'))

      expect(this.get('input-value')).to.eql('test')

      run(() => $hook('test-clear').click())
      
      expect(this.get('input-value')).to.eql('')
    })

    it('calls onBlur callback when focus is lost', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onBlur=(action 'externalAction')
        }}
      `)

      run(()=>{
        this.$('textarea').focus().focusout()
      })

      expect(
        externalActionSpy.called,
        'onBlur closure action called'
      ).to.be.true
    })

    it('calls onFocus callback when focused', function () {
      const externalActionSpy = sinon.spy()

      this.on('externalAction', externalActionSpy)

      this.render(hbs`
        {{frost-textarea
          onFocus=(action 'externalAction')
        }}
      `)

      run(()=>{
        this.$('textarea').trigger('focusin')
      })

      expect(
        externalActionSpy.called,
        'onFocus closure action called'
      ).to.be.true
    })

    // it('hook attr grabs frost-textarea as expected', function () {
    //   this.set('input-value', '')
    //   this.on('test-action', function (attr) {
    //     this.set('input-value', attr.value)
    //   })
    //   this.render(hbs`{{frost-textarea id="action" onInput=(action "test-action") hook='my-textarea'}}`)

    //   expect($hook('my-textarea').hasClass('frost-textarea'))
    //     .to.be.true

    //   expect($hook('my-textarea-input').hasClass('ember-text-area'))
    //     .to.be.true
    // })
  }
)
