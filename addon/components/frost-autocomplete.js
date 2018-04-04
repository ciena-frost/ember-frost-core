import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-autocomplete'
import {keyCodes} from '../utils'
import FrostSelect from './frost-select'

const {$, get, isEmpty, run} = Ember
const {BACKSPACE, DOWN_ARROW, UP_ARROW} = keyCodes

export default FrostSelect.extend({
  layout,

  propTypes: {
    // options
    isLoading: PropTypes.bool,

    // state
    focusedIndex: PropTypes.number,
    _userInput: PropTypes.bool,
    filterType: PropTypes.oneOf(['startsWith', 'contains']),
    _autofocus: PropTypes.bool,
    disableSpaceToggle: PropTypes.bool
  },

  getDefaultProps () {
    return {
      focusedIndex: 0,
      _userInput: false,
      filterType: 'startsWith',
      isLoading: false,
      disabled: false,
      _autofocus: false,
      disableSpaceToggle: true
    }
  },

  _handleArrowKey (upArrow) {
    if (this.get('_opened') !== true) {
      return
    }

    this._setFocusedIndex(upArrow)
  },

  _setFocusedIndex (upArrow) {
    const items = this.get('items')
    if (isEmpty(items)) {
      return
    }

    const selectedItemIndex = this.get('focusedIndex') || 0

    const newSelectedIndex = (
      upArrow ? Math.max(0, selectedItemIndex - 1) : Math.min(items.length - 1, selectedItemIndex + 1)
    )

    if (newSelectedIndex !== selectedItemIndex) {
      this.set('focusedIndex', newSelectedIndex)
    }
  },

  @readOnly
  @computed('opened', '_userInput', 'filter', 'focused')
  _opened (opened, userInput, filter, focused) {
    const open = (opened || focused) && userInput && !isEmpty(filter)
    return open
  },

  init () {
    this._super(...arguments)

    run.scheduleOnce('afterRender', this, function () {
      if (this.get('_autofocus') && $(':focus').length === 0) {
        this.set('_grabfocus', true)
      }

      this.configureFilter()
    })
  },

  configureFilter () {
    if (!isEmpty(this.internalSelectedValue) && !isEmpty(this.data)) {
      const item = this.data.find((item) => {
        return !isEmpty(item.value) && item.value === this.internalSelectedValue
      })

      if (!isEmpty(item) && !isEmpty(item.label)) {
        this.set('filter', item.label)
      }
    }
  },

  actions: {
    onKeyDown (event) {
      if ([DOWN_ARROW, UP_ARROW].indexOf(event.keyCode) !== -1) {
        this._handleArrowKey(event.keyCode === UP_ARROW)
      } else if (BACKSPACE === event.keyCode) {
        this.set('_userInput', true)
      }
    },

    onKeyPress (event) {
      this.setProperties({
        _userInput: true,
        opened: true
      })
    },

    _selectItem (selectedItem) {
      this.selectItem(get(selectedItem, 'value'))
      this.setProperties({
        _userInput: false,
        filter: get(selectedItem, 'label')
      })
      this.$element.find('input').first().focus()
    },

    onClear () {
      this.setProperties({
        _userInput: false,
        opened: false,
        internalSelectedValue: undefined
      })
    }
  }
})
