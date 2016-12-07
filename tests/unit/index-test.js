/**
 * Unit test for the re-export index module
 * May seem silly, but we had a bug where there was a typo in one of the modules being re-exported
 * Making it so that no one could import anything directly from 'ember-frost-core'
 */
import {expect} from 'chai'
import {describe, it} from 'mocha'
import * as index from 'ember-frost-core'

describe('Unit / index exports', function () {
  const componentNames = [
    'Button',
    'Checkbox',
    'Component',
    'Icon',
    'Link',
    'Loading',
    'MultiSelect',
    'Password',
    'RadioButton',
    'RadioGroup',
    'Scroll',
    'SelectDropdown',
    'SelectItem',
    'SelectOutlet',
    'Select',
    'Text',
    'Textarea',
    'Toggle',
    'HookableInput',
    'HookableTextarea'
  ]

  componentNames.forEach((name) => {
    it(`should export ${name}`, function () {
      expect(index[name]).not.to.equal(undefined)
    })
  })

  const mixinNames = [
    'CssMixin',
    'EventsProxyMixin',
    'EventsMixin'
  ]

  mixinNames.forEach((name) => {
    it(`should export ${name}`, function () {
      expect(index[name]).not.to.equal(undefined)
    })
  })

  it('should export utils', function () {
    expect(index.utils).not.to.equal(undefined)
  })
})
