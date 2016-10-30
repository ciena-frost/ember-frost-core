import Ember from 'ember'
const {Component, typeOf} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

import layout from '../templates/components/frost-select'
import keyCodes from '../utils/keycodes'
const {SPACE} = keyCodes

export default Component.extend(PropTypeMixin, {
  // == Properties ============================================================

  attributeBindings: [
    'tabIndex'
  ],

  classNameBindings: [
    'disabled:frost-select-disabled',
    'error:frost-select-error',
    'focused:frost-select-focused',
    'opened:frost-select-opened',
    'text::frost-select-placeholder'
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

  @readOnly
  @computed('data')
  items (data) {
    return data // TODO: apply filtering here?
  },

  @readOnly
  @computed('items', 'selected', 'selectedValue')
  selectedItems (items, selected, selectedValue) {
    if (selectedValue) {
      return items.filter((item) => {
        if (typeOf(selectedValue) === 'array') {
          return selectedValue.indexOf(item.value) !== -1
        }

        return item.value === selectedValue
      })
    }

    if (typeOf(selected) === 'array') {
      return selected.map((itemIndex) => items[itemIndex])
    }

    if (selected) {
      return [items[selected]]
    }

    return []
  },

  @readOnly
  @computed('selectedItems')
  text (selectedItems) {
    switch (selectedItems.length) {
      case 0:
        return null

      case 1:
        return selectedItems[0].label

      case 2:
        return `${selectedItems[0].label}, ${selectedItems[1].label}`
    }

    return `${selectedItems.length} items selected`
  },

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

  _onClick: Ember.on('click', function () {
    if (!this.get('disabled')) {
      this.toggleProperty('opened')
    }
  }),

  _onKeyPress: Ember.on('keyPress', function (e) {
    if (e.keyCode === SPACE) {
      e.preventDefault() // Keep space from scrolling page
      e.stopPropagation()
      this.toggleProperty('opened')
    }
  }),

  _onFocusIn: Ember.on('focusIn', function () {
    // If select is disabled make sure it can't get focus
    if (this.get('disabled')) {
      this.$().blur()
    } else {
      this.set('focused', true)
    }
  }),

  _onFocusOut: Ember.on('focusOut', function () {
    this.setProperties({
      focused: false,
      opened: false
    })
  }),

  // == Actions ===============================================================

  actions: {
    closeDropDown () {
      this.set('opened', false)
    },

    selectItem (selectedValue) {
      this.setProperties({
        opened: false,
        selectedValue
      })

      // TODO: inform consumer
    }
  }
})
