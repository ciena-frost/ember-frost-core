/**
 * Component definition for frost-link component
 */
import layout from '../templates/components/frost-link'
import Ember from 'ember'
import computed, {readOnly} from 'ember-computed-decorators'
import {HookMixin} from 'ember-hook'
import PropTypeMixin, {PropTypes} from 'ember-prop-types'
import SpreadMixin from 'ember-spread'
const {LinkComponent, Logger, deprecate, get, isEmpty, isPresent, run, set} = Ember

/**
 * List of valid values to pass into `design` propery
 * @type {Array} valid `design` values
 */
const validDesigns = [
  'info-bar',
  'inline'
]

/**
 * List of valid values to pass into `priorities` property
 * @type {Array} valid `priorities` values
 */
const validPriorities = [
  'primary',
  'secondary'
]

/**
 * List of valid values to pass into `size` property
 * @type {Array} valid `size` values
 */
const validSizes = [
  'large',
  'medium',
  'small'
]

export default LinkComponent.extend(PropTypeMixin, HookMixin, SpreadMixin, {
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  // == Component properties ==================================================

  /*
    The Link component provides and sets default values for:
    disabled: false - className and attributeBindings
    tabindex: null - attributeBindings
    target: null
   */

  classNameBindings: ['extraClasses'],
  classNames: ['frost-link'],
  layout,

  // == State properties ======================================================

  /**
   * Properties for this component. Options are expected to be (potentially)
   * passed in to the component. State properties are *not* expected to be
   * passed in/overwritten.
   */
  propTypes: {
    // options
    design: PropTypes.oneOf(validDesigns),
    hook: PropTypes.string.isRequired,
    hookPrefix: PropTypes.string,
    hookQualifiers: PropTypes.object,
    icon: PropTypes.string,
    priority: PropTypes.oneOf(validPriorities),
    routeNames: PropTypes.array,
    routes: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      models: PropTypes.array,
      queryParams: PropTypes.object
    })),
    size: PropTypes.oneOf(validSizes),
    linkTitle: PropTypes.string,
    onClick: PropTypes.func

    // state
  },

  /** @returns {Object} the default property values when not provided by consumer */
  getDefaultProps () {
    return {
      design: '',
      hookPrefix: this.get('hook'),
      icon: '',
      priority: '',
      routeNames: [],
      routes: [],
      size: '',
      linkTitle: ''
    }
  },

  // == Computed properties ===================================================

  /* eslint-disable complexity */
  @readOnly
  @computed('design', 'priority', 'size')
  /**
   * Get extra classes for links based on link's settings
   * @param {String} design - link design
   * @param {String} priority - link priority
   * @param {String} size - link size
   * @returns {String} extra classNames
   */
  extraClasses (design, priority, size) {
    const classes = []

    this.addDesignClass(design, classes)

    if (classes.length !== 0) {
      // display warning when design property is used together with size and/or priority
      if (priority !== '' || size !== '') {
        Logger.warn('Warning: The `design` property takes precedence over `size` and `priority`.')
      }

      return classes.join(' ')
    }

    if (validSizes.indexOf(size) !== -1) {
      classes.push(size)
    }

    if (validPriorities.indexOf(priority) !== -1) {
      classes.push(priority)
    }

    return classes.join(' ')
  },
  /* eslint-enable complexity */

  // == Functions =============================================================

  /**
   * Sets correct classes to be added to the classNames array
   * @param {String} design link design type
   * @param {Array} classes the classes to be added to the classNames array for the component
   * @returns {undefined}
   */
  addDesignClass (design, classes) {
    deprecate(
      '\'in-line\' design style has been deprecated in favour of \'inline\'',
      design !== 'in-line',
      {
        id: 'frost-debug.deprecate-design-in-line-style',
        until: '1.0.0',
        url: 'http://ciena-frost.github.io/ember-frost-core/#/link'
      }
    )

    switch (design) {
      case 'info-bar':
        classes.push('info-bar')
        break
      case 'inline':
        classes.push('inline')
        break
      default:
        // no class to add for invalid design
        break
    }
  },

  /**
   * Returns true if we should open the link in the current tab and false otherwise.
   * @returns {boolean} true if we should open the link in the current tab and false otherwise
   */
  _shouldOpenInSameTab () {
    return !(get(this, 'priority') === 'primary' && get(this, 'disabled') === false)
  },

  /**
   * Returns true if we need to open multiple links on click and false otherwise.
   * @returns {boolean} true if we need to open multiple links on click and false otherwise
   */
  _hasMultipleLinks () {
    return (get(this, 'routeNames') !== undefined && get(this, 'routeNames').length !== 0) ||
      (get(this, 'routes') !== undefined && get(this, 'routes').length !== 0)
  },

  /**
   * Open multiple links.
   */
  _openLinks () {
    const routeNames = get(this, 'routeNames')
    const routes = get(this, 'routes')

    if (!isEmpty(routeNames)) {
      let models = get(this, 'models')
      let queryParams = get(this, 'queryParams.values')

      routeNames.forEach((routeName) => {
        this._openLink(routeName, models, queryParams)
      })
    } else if (!isEmpty(routes)) {
      routes.forEach((route) => {
        this._openLink(get(route, 'name'), get(route, 'models'), get(route, 'queryParams'))
      })
    }
  },

  /**
   * Open a link in a new window.
   * @param {String} routeName the name of the route
   * @param {Array} models the route models
   * @param {Object} queryParams the route queryParams
   */
  _openLink (routeName, models, queryParams) {
    if (routeName) {
      let routing = get(this, '_routing')
      const url = routing.generateURL(routeName, models, queryParams)
      const windowHandler = window.open(url)
      if (!windowHandler) {
        Logger.warn('Warning: Make sure that the pop-ups are not blocked')
      }
    }
  },

  /**
   * Change basic link component properties to open link(s) in new tabs.
   * @returns {undefined}
   */
  _setupRouting () {
    if (!this._shouldOpenInSameTab()) {
      if (this._hasMultipleLinks()) {
        const params = get(this, 'params')
        // When we have the block format, LinkComponent expect a minimum of 1 element in params so we hardcode the
        // first parameter
        if (params && params.length === 0) {
          params.push(get(this, '_routing.currentRouteName'))
        }

        // Remove the link destination
        set(this, 'href', null)

        this._warnPropertyPrecedence()
      } else {
        set(this, 'target', '_blank')
      }
    }
  },

  _warnPropertyPrecedence () {
    let attributeName
    if (get(this, 'routeName')) {
      attributeName = 'routeName'
    } else if (get(this, 'routes')) {
      attributeName = 'routes'
    }

    if (attributeName) {
      Logger.warn(`Warning: The \`${attributeName}\` property takes precedence over \`routeName\`.`)
    }
  },
  // == DOM Events ============================================================

  /**
   * Handle the click event
   */
  click () {
    if (this._hasMultipleLinks()) {
      this._openLinks()
    }

    if (this.onClick) {
      run.next(() => {
        this.onClick()
      })
    }
  },

  // == Lifecycle Hooks =======================================================

  /**
   * Allow named parameters to be passed to the link instead of positional
   * params.  Because the link-to expects positional params the named
   * parameters must be set back against the component as a positional param
   * array in the correct order (text, route, models, queryParams).  Once set
   * we're free to hand control back to the parent function and it will react
   * as if we used the original link-to interface.
   */
  didReceiveAttrs () {
    const numberOfParams = this.get('params.length')
    if (numberOfParams <= 1) {
      let params = []
      const text = this.get('text')
      if (text) {
        params.push(text)
      }

      params.push(this.get('route'))

      const models = this.get('routeModels')
      if (!isEmpty(models)) {
        models.forEach((model) => {
          params.push(model)
        })
      }

      const queryParams = this.get('routeQueryParams')
      if (isPresent(queryParams)) {
        params.push({
          isQueryParams: true,
          values: queryParams
        })
      }

      this.set('params', params)
    }

    this._super(...arguments)
  },

  init () {
    this._super(...arguments)
    this._setupRouting()
  }

  // == Actions ===============================================================

})
