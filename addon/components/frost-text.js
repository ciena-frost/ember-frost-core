import Ember from 'ember'
const {Component, deprecate} = Ember
import computed, {readOnly} from 'ember-computed-decorators'
import layout from '../templates/components/frost-text'

export default Component.extend({
  // ==========================================================================
  // Dependencies
  // ==========================================================================

  // ==========================================================================
  // Properties
  // ==========================================================================

  classNames: ['frost-text'],
  classNameBindings: [
    'center',
    'right'
  ],
  layout,
  tabindex: 0,

  // ==========================================================================
  // Computed Properties
  // ==========================================================================

  @readOnly
  @computed('align')
  /**
   * Determine whether or not text alignment is center
   * @param {[type]} align - text alignment
   * @returns {Boolean} whether or not text alignment is center
   */
  center (align) {
    return align === 'center'
  },

  @readOnly
  @computed('align')
  /**
   * Determine whether or not text alignment is right
   * @param {String} align - text alignment
   * @returns {Boolean} whether or not text alignment is right
   */
  right (align) {
    return align === 'right'
  },

  @readOnly
  @computed('disabled', 'value')
  /**
   * Determine whether or not to show button for clearing out text field
   * @param {Boolean} disabled - whether or not input is disabled
   * @param {String} value - value of text field
   * @returns {Boolean} whether or not to show button for clearing out text field
   */
  showClear (disabled, value) {
    return !disabled && Boolean(value)
  },

  // ==========================================================================
  // Functions
  // ==========================================================================

  // ==========================================================================
  // Events
  // ==========================================================================

  /**
   * Handle the focusIn event
   * @param {Event} e - the focus-in event
   */
  focusIn (e) {
    // Selects the text when the frost-text field is selected
    e.target.select()

    if (this.onFocus) {
      deprecate('"onFocus" is deprecated and has been replaced with "onFocusIn"')
      this.onFocus(e)
    }

    if (this.onFocusIn) {
      this.onFocusIn(e)
    }
  },

  /**
   * Handle the focusOut event
   * @param {Event} e - the focus-out event
   */
  focusOut (e) {
    if (this.onBlur) {
      deprecate('"onBlur" is deprecated and has been replaced with "onFocusOut"')
      this.onBlur(e)
    }

    if (this.onFocusOut) {
      this.onFocusOut(e)
    }
  },

  /**
   * Handle the input event
   * @param {Event} e - the input event
   */
  input (e) {
    const id = this.get('id')
    const value = e.target.value

    if (this.onInput) {
      // FIXME: shouldn't this just pass out the event untouched? If we want to pass something else out
      // we should probably provide another callback that isn't a built-in event -- ARM
      this.onInput({id, value})
    }
  },

  /**
   * Handle the keyDown event
   * @param {Event} e - the keyDown event
   */
  keyDown (e) {
    if (this.onKeyDown) {
      this.onKeyDown(e)
    }
  },

  /**
   * Handle the keyUp event
   * @param {Event} e - the keyUp event
   */
  keyUp (e) {
    if (this.onKeyUp) {
      this.onKeyUp(e)
    }
  },

  // ==========================================================================
  // Actions
  // ==========================================================================

  actions: {
    /**
     * Clear the input
     */
    clear () {
      this.set('value', '')
      this.$('input').focus()
      this.$('input').val('')
      this.$('input').trigger('input')
    }
  }
})
