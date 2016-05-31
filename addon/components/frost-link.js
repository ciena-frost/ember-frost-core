import Ember from 'ember'
import layout from '../templates/components/frost-link'
import _ from 'lodash'

const { LinkComponent, deprecate } = Ember

function addPriorityClass (priority, classes) {
  switch (priority) {
    case 'primary':
      classes.push('primary')
      break
    case 'secondary':
      classes.push('secondary')
      break
    default:
      // no class to add for invalid priority
      break
  }
}

function addSizeClass (size, classes) {
  switch (size) {
    case 'small':
      classes.push('small')
      break
    case 'medium':
      classes.push('medium')
      break
    case 'large':
      classes.push('large')
      break
    default:
      // no class to add for invalid size
      break
  }
}

function addDesignClass (design, classes) {
  deprecate(
    '\'in-line\' design style has been deprecated in favour of \'inline\'',
    !_.eq(design, 'in-line'),
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
    case 'in-line':
      classes.push('in-line')
      break
    case 'inline':
      classes.push('in-line')
      break
    default:
      // no class to add for invalid design
      break
  }
}

export default LinkComponent.extend({
  classNames: ['frost-link'],

  classNameBindings: [
    'disabled',
    'extraClasses'
  ],

  attributeBindings: [
    'disabled'
  ],

  priority: '',

  icon: '',

  size: '',

  design: '',

  text: '',

  target: '',

  layout,

  extraClasses: Ember.computed('priority', function () {
    const classes = []
    addDesignClass(this.get('design'), classes)

    // only add size and priority if design has not been specified
    if (classes.length === 0) {
      addSizeClass(this.get('size'), classes)
      addPriorityClass(this.get('priority'), classes)

      // primary link opens content in a new tab
      if ((this.get('priority').indexOf('primary') > -1) && (this.get('disabled') === false)) {
        this.set('target', '_blank')
      }
    } else {
      // display warning when design property is used together with size and/or priority
      if ((this.get('priority') !== '') || (this.get('size') !== '')) {
        Ember.Logger.warn('Warning: The `design` property takes precedence over `size` and `priority`.')
      }
    }

    return classes.join(' ')
  })
})
