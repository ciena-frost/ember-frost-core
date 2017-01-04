/**
 * Component definition for frost-scroll component
 */
import Component from './frost-component'
import Ember from 'ember'
const {deprecate, run, typeOf} = Ember

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == PropTypes =============================================================

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

  didInsertElement () {
    this._super(...arguments)
    this._setupPerfectScroll()
  },

  willDestroyElement () {
    this._super(...arguments)
    this._unregisterEvents()
  },

  // == Actions ===============================================================

  actions: {
  }
})
