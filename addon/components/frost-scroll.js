import Ember from 'ember'
const {
  Component,
  deprecate,
  run: {
    debounce,
    scheduleOnce
  },
  typeOf
} = Ember
import PropTypeMixin, {PropTypes} from 'ember-prop-types'

export default Component.extend(PropTypeMixin, {

  // == Component properties ==================================================

  classNames: ['frost-scroll'],

  // == State properties ======================================================

  propTypes: {
    hook: PropTypes.string
  },

  // == Events ================================================================

  didInsertElement () {
    this._super(...arguments)
    this._setupPerfectScroll()
  },

  willClearRender () {
    this._super(...arguments)
    this._unregisterEvents()
  },

  _setupPerfectScroll () {
    const debouncePeriod = 150

    scheduleOnce('afterRender', this, () => {
      window.Ps.initialize(this.$()[0])
    })

    if (typeOf(this.onScrollUp) === 'function') {
      this.$().on('ps-scroll-up', () => {
        debounce(this, this.onScrollUp, debouncePeriod, true)
      })
    }

    if (typeOf(this.onScrollDown) === 'function') {
      this.$().on('ps-scroll-down', () => {
        debounce(this, this.onScrollDown, debouncePeriod, true)
      })
    }

    if (typeOf(this.onScrollYStart) === 'function') {
      this.$().on('ps-y-reach-start', () => {
        debounce(this, this.onScrollYStart, debouncePeriod, true)
      })
    }

    if (typeOf(this.onScrollYEnd) === 'function') {
      this.$().on('ps-y-reach-end', () => {
        debounce(this, this.onScrollYEnd, debouncePeriod, true)
      })
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
      this.$().on('ps-y-reach-end', () => {
        debounce(this, this['on-scroll-y-end'], debouncePeriod, true)
      })
    }
  },

  _unregisterEvents () {
    window.Ps.destroy(this.$()[0])

    if (typeOf(this.onScrollUp) === 'function') {
      this.$().off('ps-scroll-up')
    }

    if (typeOf(this.onScrollDown) === 'function') {
      this.$().off('ps-scroll-down')
    }

    if (typeOf(this.onScrollYStart) === 'function') {
      this.$().off('ps-y-reach-start')
    }

    if (typeOf(this.onScrollYEnd) === 'function') {
      this.$().off('ps-y-reach-end')
    }
  }

})
