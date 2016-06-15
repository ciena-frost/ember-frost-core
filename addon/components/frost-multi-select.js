import _ from 'lodash'
import computed, {readOnly} from 'ember-computed-decorators'

import FrostSelect from './frost-select'

export default FrostSelect.extend({

  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: ['frost-select', 'multi'],

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('selected')
  /**
   * Calculate the prompt based on what is selected
   * @param {Number[]} selected - the currently selected indices
   * @returns {String} the prompt to display
   */
  prompt (selected) {
    const filter = this.get('filter')
    let prompt = ''

    if (filter !== undefined) {
      prompt = filter
    } else if (selected.length < 3) {
      prompt = this.getLabels().join(', ')
    } else {
      prompt = `${selected.length} items selected`
    }

    return prompt
  },

  @readOnly
  @computed('selected')
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
   * @returns {String[]} the labels for all selected items
   */
  getLabels () {
    return _.map(this.get('selected'), (selectedIndex) => {
      return this.get('data')[selectedIndex].label
    })
  },

  /**
   * Select or de-select the given index
   * @param {Number} index - the index to select
   */
  select (index) {
    const selected = this.get('selected')

    if (_.includes(selected, index)) {
      const newSelected = _.without(selected, index)
      this.set('selected', newSelected)
    } else {
      selected.push(index)
      this.notifyPropertyChange('selected')
    }

    this.set('filter', undefined)
    this.notifyOfChange(selected)
  },

  /**
   * Perform a search (if not disabled)
   * @param {String} term - the search term
   */
  search (term) {
    if (!this.get('disableInput')) {
      this._super(term)
    }
  },

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

  // ==========================================================================
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
      const newSelection = []
      this.set('selected', newSelection)
      this.notifyOfChange(newSelection)
    }
  }
})
