import Ember from 'ember'
import iconPacks from 'ember-frost-core/icon-packs'

const { computed, Controller } = Ember

export default Controller.extend({
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
    return Object.keys(iconPacks).map((name) => {
      return {
        name: Ember.String.capitalize(name),
        icons: iconPacks[name].map((icon) => {
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
