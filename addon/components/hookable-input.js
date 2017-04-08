/**
 * Component definition for the hookable-input component
 * A simple extension of {{input}} to explicitly set the hook mixin
 */

import Ember from 'ember'
const {TextField} = Ember
import {HookMixin} from 'ember-hook'

export default TextField.extend(HookMixin, {
  attributeBindings: [
    'ariaActiveDescendant:aria-activedescendant',
    'ariaAutocomplete:aria-autocomplete',
    'ariaExpanded:aria-expanded',
    'ariaMultiselectable:aria-multiselectable',
    'ariaOwns:aria-owns',
    'role'
  ]
})
