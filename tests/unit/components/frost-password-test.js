import {expect} from 'chai'
import Ember from 'ember'
const {run} = Ember
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {initialize} from 'ember-hook'
import {describeComponent} from 'ember-mocha'
import PropTypeMixin from 'ember-prop-types'
import {
  beforeEach,
  describe,
  it
} from 'mocha'

describeComponent(
  'frost-password',
  'Unit: FrostPasswordComponent',
  {
    needs: [
      'component:frost-text'
    ],
    unit: true
  },
  function () {
    let component

    beforeEach(function () {
      initialize()
      component = this.subject()
    })

    it('includes className frost-password', function () {
      expect(component.classNames).to.include('frost-password')
    })

    it('sets default property values correctly', function () {
      expect(
        component.get('autofocus'),
        'autofocus: false'
      ).to.be.false

      expect(
        component.get('disabled'),
        'disabled: "false"'
      ).to.be.false

      expect(
        component.get('form'),
        'form: "null"'
      ).to.be.null

      expect(
        component.get('hook'),
        'hook: "undefined"'
      ).to.be.undefined

      expect(
        component.get('isRevealed'),
        'isRevealed: false'
      ).to.be.false

      expect(
        component.get('maxlength'),
        'maxlength: "null"'
      ).to.be.null

      expect(
        component.get('placeholder'),
        'placeholder: "null"'
      ).to.be.null

      expect(
        component.get('readonly'),
        'readonly: false'
      ).to.be.false

      expect(
        component.get('required'),
        'required: false'
      ).to.be.false

      expect(
        component.get('revealable'),
        'revealable: false'
      ).to.be.false

      expect(
        component.get('selectionDirection'),
        'selectionDirection: "none"'
      ).to.eql('none')

      expect(
        component.get('tabindex'),
        'tabindex: 0'
      ).to.eql(0)

      expect(
        component.get('title'),
        'title: "null"'
      ).to.be.null

      expect(
        component.get('type'),
        'type: "password"'
      ).to.eql('password')

      expect(
        component.get('value'),
        'value: "null"'
      ).to.be.null
    })

    it('has the expected Mixins', function () {
      expect(
        PropTypeMixin.detect(component),
        'PropTypeMixin Mixin is present'
      ).to.be.true

      expect(
        FrostEventsProxy.detect(component),
        'FrostEventsProxy Mixin is present'
      ).to.be.true
    })

    it('sets dependent keys correctly', function () {
      const revealMessageDependentKeys = [
        'isRevealed'
      ]

      const typeDependentKeys = [
        'isRevealed'
      ]

      expect(
        component.revealMessage._dependentKeys,
        'Dependent keys are correct for revealMessage()'
      ).to.eql(revealMessageDependentKeys)

      expect(
        component.type._dependentKeys,
        'Dependent keys are correct for type()'
      ).to.eql(typeDependentKeys)
    })

    describe('"revealMessage" computed property', function () {
      it('is set to "Hide" when "isRevealed" is true', function () {
        const isRevealed = true

        run(() => component.set('isRevealed', isRevealed))

        expect(
          component.get('revealMessage'),
          'revealMessage: "Hide"'
        ).to.eql('Hide')
      })

      it('is set to "Show" when "isRevealed" is false', function () {
        const isRevealed = false

        run(() => component.set('isRevealed', isRevealed))

        expect(
          component.get('revealMessage'),
          'revealMessage: "Show"'
        ).to.eql('Show')
      })
    })

    describe('"type" computed property', function () {
      it('is set to "text" when "isRevealed" is true', function () {
        const isRevealed = true

        run(() => component.set('isRevealed', isRevealed))

        expect(
          component.get('type'),
          'type: "text"'
        ).to.eql('text')
      })

      it('is set to "password" when "isRevealed" is false', function () {
        const isRevealed = false

        run(() => component.set('isRevealed', isRevealed))

        expect(
          component.get('type'),
          'type: "password"'
        ).to.eql('password')
      })
    })
  }
)
