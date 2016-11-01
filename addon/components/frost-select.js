import Ember from 'ember'
const {$, Component, run, typeOf} = Ember
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
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    error: PropTypes.bool,
    hook: PropTypes.string.isRequired,
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

    // Private
    $element: PropTypes.object,
    focused: PropTypes.bool,
    opened: PropTypes.bool
  },

  getDefaultProps () {
    return {
      autofocus: false,
      disabled: false,
      error: false,
      focused: false,
      multiselect: false,
      renderTarget: 'frost-select',
      tabIndex: 0
    }
  },

  // == Computed Properties ===================================================

  @readOnly
  @computed('data', 'filter', 'onInput')
  items (data, filter, onInput) {
    // If no data to filter we are done
    if (!data) {
      return data
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
  @computed('data', 'selected', 'selectedValue')
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

    // If autofocus and nothing else has focus, focus on select
    if (this.get('autofocus') && $(':focus').length === 0) {
      this.$().focus()
    }
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
    } else if (!this.get('focused')) {
      this.set('focused', true)

      const onFocus = this.get('onFocus')

      if (typeOf(onFocus) === 'function') {
        this.get('onFocus')()
      }
    }
  }),

  _onFocusOut: Ember.on('focusOut', function () {
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

  // == Actions ===============================================================

  actions: {
    closeDropDown () {
      this.setProperties({
        filter: '',
        opened: false
      })

      // We need to make sure focus goes back to select since it is on the
      // filter text input while the dropdown is open
      this.$().focus()
    },

    filterInput (e) {
      const filter = e.target.value
      const onInput = this.get('onInput')

      if (typeOf(onInput) === 'function') {
        onInput(filter)
      } else {
        this.set('filter', filter)
      }
    },

    selectItem (selectedValue) {
      const isMultiselect = this.get('multiselect')
      const props = {
        opened: isMultiselect,
        selectedValue
      }

      if (!isMultiselect) {
        props.filter = ''
      }

      this.setProperties(props)

      const onChange = this.get('onChange')

      if (typeOf(onChange) === 'function') {
        this.onChange(selectedValue)
      }

      // We need to make sure focus goes back to select since it is on the
      // filter text input while the dropdown is open
      this.$().focus()
    }
  }
})
