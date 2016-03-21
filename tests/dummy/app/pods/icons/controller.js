import Ember from 'ember'
import svgs from 'ember-frost-icons/svgs'
import _ from 'lodash/lodash'

export default Ember.Controller.extend({
  backgroundColors: [
    'bg-tile-color',
    'bg-content-color',
    'bg-info-color',
    'bg-hint-text-color',
    'bg-line-color',
    'bg-main-button-color'
  ],

  backgroundColor: 'bg-tile-color',

  entries: Ember.computed(function () {
    return _.keys(svgs).reduce((entries, category) => {
      return _.union(entries, _.keys(svgs[category]).map((entry) => {
        const icon = `${category}/${entry}`
        return {
          icon,
          markdown: `\`${icon}\``
        }
      }))
    }, [])
  }),

  actions: {
    colorSelected (color) {
      console.log(`selected: ${color}`)
      this.set('backgroundColor', color)
    }
  }
})
