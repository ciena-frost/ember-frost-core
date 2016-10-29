import Ember from 'ember'
const {Component} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select'
import keyCodes from '../utils/keycodes'
const {ENTER, SPACE} = keyCodes

export default Component.extend(PropTypeMixin, {
  // == Properties ============================================================

  attributeBindings: [
    'tabIndex'
  ],

  classNameBindings: [
    'disabled',
    'error',
    'focused',
    'opened'
  ],

  classNames: [
    'frost-select'
  ],

  layout,

  propTypes: {
    // Public
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    hook: PropTypes.string.isRequired,
    multiple: PropTypes.bool,
    outlet: PropTypes.string,
    tabIndex: PropTypes.number,

    // Private
    $element: PropTypes.object,
    focused: PropTypes.bool,
    opened: PropTypes.bool
  },

  getDefaultProps () {
    return {
      disabled: false,
      error: false,
      focused: false,
      multiple: false,
      outlet: 'frost-select',
      tabIndex: 0
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == Events ================================================================

  didInsertElement () {
    this._super(...arguments)

    // We need jQuery instance of components root DOM node to hand off to
    // dropdown so it can position itself properly relative to the select
    this.set('$element', this.$())
  },

  didReceiveAttrs () {
    this._super(...arguments)

    // Make sure user can't tab into disabled select
    if (this.get('disabled')) {
      this.set('tabIndex', -1)
    }
  },

  _onKeyPress: Ember.on('keyPress', function (e) {
    if ([ENTER, SPACE].indexOf(e.keyCode) !== -1) {
      e.preventDefault() // Keep space from scrolling page
      e.stopPropagation()
      this.toggleProperty('opened')
    }
  }),

  _onFocus: Ember.on('focusIn', function () {
    // If select is disabled make sure it can't get focus
    if (this.get('disabled')) {
      this.$().blur()
    } else {
      this.set('focused', true)
    }
  }),

  // == Actions ===============================================================

  actions: {
  }
})
