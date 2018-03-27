import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {PropTypes} from 'ember-prop-types'
import layout from '../templates/components/frost-autocomplete'
import {keyCodes} from '../utils'
import FrostSelect from './frost-select'

const {$, get, isEmpty, run} = Ember
const {DOWN_ARROW, UP_ARROW} = keyCodes

export default FrostSelect.extend({
  layout,
  classNames: 'frost-select',

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

  /* eslint-disable complexity */
  _handleArrowKey (upArrow) {
    if (this.get('_opened') !== true) {
      return
    }

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

  /* eslint-enable complexity */
  @readOnly
  @computed('opened', '_userInput', 'filter')
  _opened (opened, userInput, filter) {
    const open = opened && userInput && !isEmpty(filter)
    return open
  },

  init () {
    this._super(...arguments)

    run.scheduleOnce('afterRender', this, function () {
      if (this.get('_autofocus') && $(':focus').length === 0) {
        this.set('_grabfocus', true)
      }
    })

    run.scheduleOnce('afterRender', this, function () {
      if (!isEmpty(this.internalSelectedValue) && !isEmpty(this.data)) {
        const item = this.data.find((item) => {
          if (isEmpty(item.value)) {
            return false
          }
          if (item.value === this.internalSelectedValue) {
            return true
          }
          return false
        })

        if (!isEmpty(item) && !isEmpty(item.label)) {
          this.set('filter', item.label)
        }
      }
    })
  },

  actions: {
    onKeyDown (event) {
      if ([DOWN_ARROW, UP_ARROW].indexOf(event.keyCode) !== -1) {
        this._handleArrowKey(event.keyCode === UP_ARROW)
      }
    },

    onKeyPress (event) {
      this.set('_userInput', true)
      this.set('opened', true)
    },

    _selectItem (selectedItem) {
      this.set('_userInput', false)
      this.selectItem(get(selectedItem, 'value'))
      this.set('filter', get(selectedItem, 'label'))
    },

    onClear () {
      const props = {
        opened: false,
        internalSelectedValue: undefined
      }

      this.set('_userInput', false)
      this.setProperties(props)
    }
  }
})
