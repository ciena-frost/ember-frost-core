/**
 * Component definition for frost-select component
 */
import layout from '../templates/components/frost-select'
import keyCodes from '../utils/key-codes'
import Component from './frost-component'
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
const {$, get, on, run, typeOf} = Ember

const {DOWN_ARROW, SPACE, UP_ARROW} = keyCodes

/**
 * Compare two string arrays to determine if they contain the same values
 * NOTE: this method does not care about the order of the items
 * @param {Array<String>} a - first array
 * @param {Array<String>} b second array
 * @returns {Boolean} whether or not arrays contain same values
 */
function compareArrays (a, b) {
  if (a.length !== b.length) {
    return false
  }

  a = a.sort()
  b = b.sort()

  return a.every((value, index) => value === b[index])
}

/**
 * Compare two selected value objects to determine if they are equivalent
 * @param {Array<String>|String} a - first selected value object
 * @param {Array<String>|String} b - second selected value object
 * @returns {Boolean} whether or not selected value objects are equivalent
 */
function compareSelectedValues (a, b) {
  if (typeOf(a) === 'array' && typeOf(b) === 'array') {
    return compareArrays(a, b)
  }

  return a === b
}

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: [
    'computedTabIndex:tabIndex'
  ],

  classNameBindings: [
    'disabled:frost-select-disabled',
    'error:frost-select-error',
    'focused:frost-select-focused',
    'opened:frost-select-opened',
    'text::frost-select-placeholder'
  ],

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    multiselect: PropTypes.bool,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onInput: PropTypes.func,
    renderTarget: PropTypes.string,
    selected: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.number
    ]),
    selectedValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.null,
      PropTypes.object,
      PropTypes.string
    ]),
    tabIndex: PropTypes.number,

    // state
    $element: PropTypes.object,
    focused: PropTypes.bool,
    internalSelectedValue: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
      PropTypes.null,
      PropTypes.object,
      PropTypes.string
    ]),
    opened: PropTypes.bool
  },

  getDefaultProps () {
    return {
      // options
      autofocus: false,
      disabled: false,
      error: false,
      multiselect: false,
      renderTarget: 'frost-select',
      tabIndex: 0,

      // state
      focused: false
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('data', 'filter', 'onInput')
  // FIXME: jsdoc
  items (data, filter, onInput) {
    // If no data to filter we are done
    if (!data) {
      return []
    }

    // External filtering
    if (typeOf(onInput) === 'function') {
      return data
    }

    // Internal filtering

    filter = filter ? filter.toLowerCase() : ''

    return data
      .filter((item) => {
        if (!filter) {
          return true
        }

        const label = item.label || ''

        return label.toLowerCase().indexOf(filter) !== -1
      })
  },

  @readOnly
  @computed('data', 'selected', 'internalSelectedValue')
  // FIXME: jsdoc
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
      return selected
        .filter((itemIndex) => itemIndex >= 0 && itemIndex < items.length)
        .map((itemIndex) => items[itemIndex])
    }

    if (selected ** selected <= 0 && selected < items.length) {
      return [items[selected]]
    }

    return []
  },

  @readOnly
  @computed('disabled', 'tabIndex')
  /**
   * Get appropriate tab index
   * disabled state changes.
   * @param {Boolean} disabled - whether or not input is disabled
   * @param {Number} tabIndex - tab index
   * @returns {Number} tab index
   */
  computedTabIndex (disabled, tabIndex) {
    return disabled ? -1 : tabIndex
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

  // == DOM Events ============================================================

  // FIXME: jsdoc
  _onClick: on('click', function () {
    if (!this.get('disabled')) {
      this.toggleProperty('opened')
    }
  }),

  // FIXME: jsdoc
  _onKeyDown: on('keyDown', function (e) {
    if (
      [DOWN_ARROW, UP_ARROW].indexOf(e.keyCode) !== -1 &&
      !this.get('openend')
    ) {
      e.preventDefault() // Keep up/down arrow from scrolling page
      e.stopPropagation()
      this.set('opened', true)
    }
  }),

  // FIXME: jsdoc
  _onKeyPress: on('keyPress', function (e) {
    if (e.keyCode === SPACE) {
      e.preventDefault() // Keep space from scrolling page
      e.stopPropagation()
      this.toggleProperty('opened')
    }
  }),

  // FIXME: jsdoc
  _onFocusIn: on('focusIn', function () {
    // If select is disabled make sure it can't get focus
    if (this.get('disabled')) {
      this.$().blur()
    } else if (!this.get('focused')) {
      this.set('focused', true)

      const onFocus = this.get('onFocus')

      if (typeOf(onFocus) === 'function') {
        this.get('onFocus')()
      }
    }
  }),

  // FIXME: jsdoc
  _onFocusOut: on('focusOut', function () {
    // We must use run.later so filter text input has time to focus when select
    // dropdown is being opened
    run.later(() => {
      if (this.isDestroyed || this.isDestroying) {
        return
      }

      const focusedElement = $(':focus')[0]
      const filterElement = $('.frost-select-dropdown .frost-text-input')[0]

      // If focus has moved to filter in select dropdown then keep select
      // visually focused and open
      if (filterElement && focusedElement === filterElement) {
        return
      }

      const isFocused = this.get('focused')
      const onBlur = this.get('onBlur')

      this.setProperties({
        focused: false,
        opened: false
      })

      if (typeOf(onBlur) === 'function' && isFocused) {
        this.get('onBlur')()
      }
    })
  }),

  // == Lifecycle Hooks =======================================================

  didInsertElement () {
    this._super(...arguments)

    // We need jQuery instance of components root DOM node to hand off to
    // dropdown so it can position itself properly relative to the select
    this.set('$element', this.$())

    // If autofocus and nothing else has focus, focus on select
    if (this.get('autofocus') && $(':focus').length === 0) {
      this.$().focus()
    }
  },

  didReceiveAttrs (attrs) {
    this._super(...arguments)

    const props = {}

    let newSelectedValue = get(attrs, 'newAttrs.selectedValue.value')
    let oldSelectedValue = get(attrs, 'oldAttrs.selectedValue.value')

    // If user provided a new selected value and it doesn't match the internal
    // selected value then update internal selected value
    if (
      !compareSelectedValues(newSelectedValue, oldSelectedValue) &&
      !compareSelectedValues(newSelectedValue, this.get('internalSelectedValue'))
    ) {
      props.internalSelectedValue = newSelectedValue
    }

    if (Object.keys(props).length !== 0) {
      this.setProperties(props)
    }
  },

  // == Actions ===============================================================

  actions: {
    // FIXME: jsdoc
    closeDropDown () {
      this.setProperties({
        filter: '',
        opened: false
      })

      // We need to make sure focus goes back to select since it is on the
      // filter text input while the dropdown is open
      this.$().focus()
    },

    // FIXME: jsdoc
    filterInput (e) {
      const filter = e.target.value
      const onInput = this.get('onInput')

      if (typeOf(onInput) === 'function') {
        onInput(filter)
      } else {
        this.set('filter', filter)
      }
    },

    // FIXME: jsdoc
    selectItem (selectedValue) {
      const isMultiselect = this.get('multiselect')
      const props = {
        opened: isMultiselect,
        internalSelectedValue: selectedValue
      }

      if (!isMultiselect) {
        props.filter = ''
      }

      this.setProperties(props)

      const onChange = this.get('onChange')

      if (typeOf(onChange) === 'function') {
        run.next(() => {
          this.onChange(selectedValue)
        })
      }

      // We need to make sure focus goes back to select since it is on the
      // filter text input while the dropdown is open
      this.$().focus()
    }
  }
})
