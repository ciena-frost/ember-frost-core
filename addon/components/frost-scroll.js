import Ember from 'ember'
const {
  Component,
  deprecate,
  on,
  run: {
    debounce,
    scheduleOnce
  },
  typeOf
} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

const debouncePeriod = 150

export default Component.extend(PropTypeMixin, {

  // == Component properties ==================================================

  classNames: ['frost-scroll'],

  // == State properties ======================================================

  propTypes: {
    hook: PropTypes.string
  },

  // == Events ================================================================

  /* eslint-disable complexity */
  initializeScroll: on('didInsertElement', function () {
    scheduleOnce('afterRender', this, () => {
      window.Ps.initialize(this.$()[0])
    })

    this._legacyScrollYEndHandler = () => {
      debounce(this, this['on-scroll-y-end'], debouncePeriod, true)
    }

    this._scrollDownHandler = () => {
      debounce(this, this.onScrollDown, debouncePeriod, true)
    }

    this._scrollUpHandler = () => {
      debounce(this, this.onScrollUp, debouncePeriod, true)
    }

    this._scrollYEndHandler = () => {
      debounce(this, this.onScrollYEnd, debouncePeriod, true)
    }

    this._scrollYStartHandler = () => {
      debounce(this, this.onScrollYStart, debouncePeriod, true)
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
      this.$().on('ps-y-reach-end', this._legacyScrollYEndHandler)
    }
  }),
  /* eslint-enable complexity */

  cleanup: on('willDestroyElement', function () {
    this.$().off('ps-scroll-down', this._scrollDownHandler)
    this.$().off('ps-scroll-up', this._scrollUpHandler)
    this.$().off('ps-y-reach-end', this._legacyScrollYEndHandler)
    this.$().off('ps-y-reach-end', this._scrollYEndHandler)
    this.$().off('ps-y-reach-start', this._scrollYStartHandler)
    window.Ps.destroy(this.$()[0])
  })
})
