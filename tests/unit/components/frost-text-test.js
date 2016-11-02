import {expect} from 'chai'
const {run} = Ember
import Ember from 'ember'
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  describe,
  it
} from 'mocha'

describeComponent(
  'frost-text',
  'Unit: FrostTextComponent', {
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      component = this.subject()
    })

    it('includes className frost-text', function () {
      expect(component.classNames).to.include('frost-text')
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
      ).to.be.false

      expect(
        component.get('isClearEnabled'),
        'isClearEnabled: false'
      ).to.be.false

      expect(
        component.get('isClearVisible'),
        'isClearVisible: false'
      ).to.be.false

      expect(
        component.get('isHookEmbedded'),
        'isHookEmbedded: false'
      ).to.be.false

      expect(
        component.get('readonly'),
        'readonly: false'
      ).to.be.false

      expect(
        component.get('required'),
        'required: false'
      ).to.be.false

      expect(
        component.get('selectionDirection'),
        'selectionDirection: none'
      ).to.be.eql('none')

      expect(
        component.get('spellcheck'),
        'spellcheck: false'
      ).to.be.false

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
        'form: null'
      ).to.be.null

      expect(
        component.get('maxlength'),
        'maxlength: null'
      ).to.be.null

      expect(
        component.get('placeholder'),
        'placeholder: null'
      ).to.be.null

      expect(
        component.get('title'),
        'title: null'
      ).to.be.null

      expect(
        component.get('value'),
        'value: null'
      ).to.be.null
    })

    it('has the expect Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true

      expect(
        FrostEventsProxy.detect(component),
        'FrostEventsProxy is present'
      ).to.be.true
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
