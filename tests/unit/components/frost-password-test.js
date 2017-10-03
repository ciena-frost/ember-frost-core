import {run} from '@ember/runloop'
import {expect} from 'chai'
import Component from 'ember-frost-core/components/frost-component'
import FrostEventsProxy from 'ember-frost-core/mixins/frost-events-proxy'
import {unit} from 'ember-test-utils/test-support/setup-component-test'
import {beforeEach, describe, it} from 'mocha'

const test = unit('frost-password')
describe(test.label, function () {
  test.setup()

  let component

  beforeEach(function () {
    component = this.subject({
      hook: 'myPassword'
    })
  })

  it('sets default property values correctly', function () {
    expect(
      component.get('autofocus'),
      'autofocus: false'
    ).to.equal(false)

    expect(
      component.get('disabled'),
      'disabled: "false"'
    ).to.equal(false)

    expect(
      component.get('isRevealed'),
      'isRevealed: false'
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
      component.get('revealable'),
      'revealable: false'
    ).to.equal(false)

    expect(
      component.get('selectionDirection'),
      'selectionDirection: "none"'
    ).to.eql('none')

    expect(
      component.get('tabindex'),
      'tabindex: 0'
    ).to.eql(0)

    expect(
      component.get('type'),
      'type: "password"'
    ).to.eql('password')
  })

  it('extends the commone frost component', function () {
    expect(
      component instanceof Component,
      'is instance of Frost Component'
    ).to.equal(true)
  })

  it('has the expected Mixins', function () {
    expect(
      FrostEventsProxy.detect(component),
      'FrostEventsProxy Mixin is present'
    ).to.equal(true)
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
})
