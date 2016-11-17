/**
 * Component definition for frost-scroll component
 */
import Ember from 'ember'
const {Component, deprecate, run, typeOf} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNames: ['frost-scroll'],

  // == PropTypes =============================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    hook: PropTypes.string,

    // state

    // keywords
    classNames: PropTypes.arrayOf(PropTypes.string)
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      // options

      // state
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  /* eslint-disable complexity */
  /**
   * Setup the perfect-scrollbar plugin and events
   *
   * @private
   * @returns {undefined}
   */
  _setupPerfectScroll () {
    const debouncePeriod = 150

    run.scheduleOnce('afterRender', this, () => {
      window.Ps.initialize(this.$()[0])
    })

    this._legacyScrollYEndHandler = () => {
      run.debounce(this, this['on-scroll-y-end'], debouncePeriod, true)
    }

    this._scrollDownHandler = () => {
      run.debounce(this, this.onScrollDown, debouncePeriod, true)
    }

    this._scrollUpHandler = () => {
      run.debounce(this, this.onScrollUp, debouncePeriod, true)
    }

    this._scrollYEndHandler = () => {
      run.debounce(this, this.onScrollYEnd, debouncePeriod, true)
    }

    this._scrollYStartHandler = () => {
      run.debounce(this, this.onScrollYStart, debouncePeriod, true)
    }

    if (typeOf(this.onScrollUp) === 'function') {
      this.$().on('ps-scroll-up', this._scrollUpHandler)
    }

    if (typeOf(this.onScrollDown) === 'function') {
      this.$().on('ps-scroll-down', this._scrollDownHandler)
    }

    if (typeOf(this.onScrollYStart) === 'function') {
      this.$().on('ps-y-reach-start', this._scrollYStartHandler)
    }

    if (typeOf(this.onScrollYEnd) === 'function') {
      this.$().on('ps-y-reach-end', this._scrollYEndHandler)
    }

    if (typeOf(this.attrs['on-scroll-y-end']) === 'function') {
      deprecate('on-scroll-y-end has been deprecated in favor of onScrollYEnd',
        false,
        {
          id: 'frost-debug.deprecate-on-scroll-y-end',
          until: '1.0.0',
          url: 'http://ciena-frost.github.io/ember-frost-core/#/scroll'
        }
      )
    }
  },

  /**
   * Remove perfect-scrollbar plugin and events
   *
   * @private
   * @returns {undefined}
   */
  _unregisterEvents () {
    window.Ps.destroy(this.$()[0])

    if (typeOf(this.onScrollUp) === 'function') {
      this.$().off('ps-scroll-up', this._scrollUpHandler)
    }

    if (typeOf(this.onScrollDown) === 'function') {
      this.$().off('ps-scroll-down', this._scrollDownHandler)
    }

    if (typeOf(this.onScrollYStart) === 'function') {
      this.$().off('ps-y-reach-start', this._scrollYStartHandler)
    }

    if (typeOf(this.onScrollYEnd) === 'function') {
      this.$().off('ps-y-reach-end', this._scrollYEndHandler)
    }
  },
  /* eslint-enable complexity */

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  /* Ember.Component method */
  didInsertElement () {
    this._super(...arguments)
    this._setupPerfectScroll()
  },

  /* Ember.Component method */
  willDestroyElement () {
    this._super(...arguments)
    this._unregisterEvents()
  },

  // == Actions ===============================================================

  actions: {
  }

})
