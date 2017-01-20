import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import Component from 'ember-frost-core/components/frost-component'
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {describeComponent} from 'ember-mocha'
import {beforeEach, describe, it} from 'mocha'

describeComponent(
  'frost-text',
  'Unit: FrostTextComponent', {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject({
        hook: 'myTextInput'
      })
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('align'),
        'align: left'
      ).to.be.eql('left')

      expect(
        component.get('autocapitalize'),
        'autocapitalize: off'
      ).to.be.eql('off')

      expect(
        component.get('autocorrect'),
        'autocorrect: off'
      ).to.be.eql('off')

      expect(
        component.get('autofocus'),
        'autofocus: false'
      ).to.equal(false)

      expect(
        component.get('isClearEnabled'),
        'isClearEnabled: false'
      ).to.equal(false)

      expect(
        component.get('isClearVisible'),
        'isClearVisible: false'
      ).to.equal(false)

      expect(
        component.get('isHookEmbedded'),
        'isHookEmbedded: false'
      ).to.equal(false)

      expect(
        component.get('readonly'),
        'readonly: false'
      ).to.equal(false)

      expect(
        component.get('required'),
        'required: false'
      ).to.equal(false)

      expect(
        component.get('spellcheck'),
        'spellcheck: false'
      ).to.equal(false)

      expect(
        component.get('tabindex'),
        'tabindex: 0'
      ).to.be.eql(0)

      expect(
        component.get('type'),
        'type: text'
      ).to.be.eql('text')

      expect(
        component.get('form'),
        'form: \'\''
      ).to.equal('')

      expect(
        component.get('maxlength'),
        'maxlength: undefined'
      ).to.equal(undefined)

      expect(
        component.get('placeholder'),
        'placeholder: \'\''
      ).to.equal('')

      expect(
        component.get('title'),
        'title: \'\''
      ).to.equal('')

      expect(
        component.get('value'),
        'value: \'\''
      ).to.equal('')
    })

    it('extends the commone frost component', function () {
      expect(
        component instanceof Component,
        'is instance of Frost Component'
      ).to.equal(true)
    })

    it('has the expect Mixins', function () {
      expect(
        FrostEventsProxy.detect(component),
        'FrostEventsProxy is present'
      ).to.equal(true)
    })

    describe('when keyUp property is omitted', function () {
      beforeEach(function () {
        run(() => component.set('keyUp', undefined))
      })

      it('does not throw an error when keyUp action is triggered', function () {
        expect(
          function () {
            component.get('actions.keyUp').call(component)
          },
          'error not triggered by keyup()'
        ).not.to.throw(Error)
      })
    })
  }
)
