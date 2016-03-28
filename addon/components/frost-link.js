import Ember from 'ember'
import layout from '../templates/components/frost-link'

function addPriorityClass (priority, classes) {
  switch (priority) {
    case 'primary':
      classes.push('primary')
      break
    case 'secondary':
      classes.push('secondary')
      break
    case 'tertiary':
      classes.push('tertiary')
      break
    case 'action':
      classes.push('action')
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
  switch (design) {
    case 'info-bar-action':
      classes.push('action')
      break
    default:
      // no class to add for invalid design
      break
  }
}

export default Ember.LinkComponent.extend({
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
    } else {
      // use generic action style for design
      this.set('design', 'action')

      // design link requires an icon
      if (this.get('icon') === '') {
        Ember.Logger.error('Error: The `design` property requires `icon` property to be specified.')
        return
      }

      // display warning when design property is used together with size and/or priority
      if ((this.get('priority') !== '') || (this.get('size') !== '')) {
        Ember.Logger.warn('Warning: The `design` property takes precedence over `size` and `priority`.')
      }
    }

    // primary link opens content in a new tab
    if (this.get('priority').indexOf('primary') > -1) {
      this.set('target', '_blank')
    }

    return classes.join(' ')
  })
})
