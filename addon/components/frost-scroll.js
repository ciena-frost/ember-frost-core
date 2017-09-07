/**
 * Component definition for frost-scroll component
 */
import Component from './frost-component'
import Ember from 'ember'
const {deprecate, run, typeOf} = Ember
import {PropTypes} from 'ember-prop-types'

export default Component.extend({

  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == PropTypes =============================================================
  propTypes: {
    refreshOnMouseEnter: PropTypes.bool
  },

  getDefaultProps () {
    return {
      refreshOnMouseEnter: false
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
      if (!this.isDestroying && !this.isDestroyed) {
        window.Ps.initialize(this.$()[0], this.get('psOptions') || {})
      }
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

    this._scrollXHandler = () => {
      run.debounce(this, this.onScrollX, debouncePeriod, true)
    }

    this._scrollRightHandler = () => {
      run.debounce(this, this.onScrollRight, debouncePeriod, true)
    }

    this._scrollLeftHandler = () => {
      run.debounce(this, this.onScrollLeft, debouncePeriod, true)
    }

    this._mouseEnterHandler = () => {
      window.Ps.update(this.get('element'))
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

    if (typeOf(this.onScrollX) === 'function') {
      this.$().on('ps-scroll-x', this._scrollXHandler)
    }

    if (typeOf(this.onScrollRight) === 'function') {
      this.$().on('ps-scroll-right', this._scrollRightHandler)
    }

    if (typeOf(this.onScrollLeft) === 'function') {
      this.$().on('ps-scroll-left', this._scrollLeftHandler)
    }

    if (this.refreshOnMouseEnter) {
      this.$().on('mouseenter', this._mouseEnterHandler)
    }

    if (typeOf(this['on-scroll-y-end']) === 'function') {
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

    if (typeOf(this.onScrollX) === 'function') {
      this.$().off('ps-scroll-x', this._scrollXHandler)
    }

    if (typeOf(this.onScrollRight) === 'function') {
      this.$().off('ps-scroll-right', this._scrollRightHandler)
    }

    if (typeOf(this.onScrollLeft) === 'function') {
      this.$().off('ps-scroll-left', this._scrollLeftHandler)
    }

    if (this.refreshOnMouseEnter) {
      this.$().off('mouseenter', this._mouseEnterHandler)
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
  didRender () {
    window.Ps.update(this.$()[0])
  },
  // == Actions ===============================================================

  actions: {
  }
})
