import Ember from 'ember'
import iconPacks from 'ember-frost-core/icon-packs'
import _ from 'lodash/lodash'

const { computed } = Ember

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
  iconPacks: computed('iconPacks', () => {
    return _.map(_.keys(iconPacks), (name) => {
      return {
        name: _.capitalize(name),
        icons: _.map(iconPacks[name], (icon) => {
          return {
            name: icon,
            markdown: `\`${icon}\``
          }
        })
      }
    })
  }),

  actions: {
    colorSelected (color) {
      this.set('backgroundColor', color)
    }
  }
})
