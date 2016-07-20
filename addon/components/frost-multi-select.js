import _ from 'lodash'
import computed, {readOnly} from 'ember-computed-decorators'
import FrostSelect from './frost-select'
import layout from '../templates/components/frost-multi-select'
import reducer from '../reducers/frost-multi-select'
import {clearSelection} from '../actions/frost-multi-select'
import Redux from 'npm:redux'


export default FrostSelect.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: ['frost-select', 'multi'],
  stateProperties: [
    'open',
    'prompt',
    'disabled',
    'displayItems',
    'selectedItems'
  ],
  layout,

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @computed('selectedItems',  'disabled')
  /**
   * Input should be disabled if anything is selected
   * @param {Number[]} selected - the selected indices
   * @param {Boolean} disabled - the selected indices
   * @returns {Boolean} true if anything is selected
   */
  disableInput (selected, disabled) {
    return disabled || (selected.length > 0)
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  /**
   * Select a given option by value (rather than by index)
   * @param {Object} value - the value to select
   */
  selectOptionByValue (value) {
    if (_.isUndefined(value)) {
      return
    }

    if (!_.isArray(value)) {
      value = [value]
    }

    const items = this.get('items')
    const selected = value
      .map((value) => {
        return _.findIndex(items, (item) => _.isEqual(item.value, value))
      })
      .filter((val) => (val >= 0))

    this.set('selected', selected)
    this.set('filter', undefined)
    this.notifyOfChange(selected)
  },

  setUpReduxStore () {
    const reduxStore = Redux.createStore(reducer)
    this.set('reduxStore', reduxStore)
    return reduxStore
  },

  getValues () {
    const selected = this.get('selectedItems')
    const state = this.get('reduxStore').getState()
    return _.map(selected, (item) => {
      return state.baseItems[item].value
    })
  },
  // ===================================r=======================================
  // Events
  // ==========================================================================

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {
    // TODO: Add jsdoc
    onCheck (data) {
      // stub for checkbox action
    },

    /**
     * Clear the selected property and notify parent of change
     */
    clearSelection () {
      this.get('reduxStore').dispatch(clearSelection)
      this.notifyOfChange()
    }
  }
})
