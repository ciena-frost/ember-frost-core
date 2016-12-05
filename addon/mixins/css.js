/**
 * Mixin for providing a `css` property on components
 * The `css` property will be the introspected name of the component
 */
import Ember from 'ember'
const {Mixin} = Ember
import {PropTypes} from 'ember-prop-types'

export default Mixin.create({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['css'],

  // == PropTypes =============================================================

  propTypes: {
    css: PropTypes.string
  },

  /**
   * @returns {Object} the default properties for this mixin
   */
  getDefaultProps () {
    return {
      css: this.getComponentName()
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  /**
   * @returns {String} the name of the component, parsed out of the toString() result
   */
  getComponentName () {
    return this.toString().replace(/^.+:(.+)::.+$/, '$1')
  },

  /**
   * This function is really only here because we can't stub this._super
   * @see {@link https://github.com/emberjs/ember.js/issues/12457}
   * It let's us test the functionality in the `init()` method w/o having to call
   * the real this._super() which was breaking when testing with tagName === '' for some reason
   */
  maybeClearClassNameBindings () {
    if (this.get('tagName') === '') {
      this.set('classNameBindings', undefined)
    }
  },

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  // Strip classNameBindings from tagless components
  init () {
    this._super(...arguments)
    this.maybeClearClassNameBindings()
  },

  // == Actions ===============================================================
  actions: {}
})
