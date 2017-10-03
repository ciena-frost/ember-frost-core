/**
 * Component definition for the hookable-textarea component
 * A simple extension of {{textarea}} to explicitly set the hook mixin
 */

import TextArea from '@ember/component/text-area'

import {HookMixin} from 'ember-hook'

export default TextArea.extend(HookMixin, {
})
