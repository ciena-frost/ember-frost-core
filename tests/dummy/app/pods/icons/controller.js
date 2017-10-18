import Controller from '@ember/controller'
import {computed} from '@ember/object'
import {capitalize} from '@ember/string'
import iconPacks from 'modules/ember-frost-core/icon-packs'

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
        name: capitalize(name),
        icons: iconPacks[name].map((icon) => {
          return {
            name: icon,
            markdown: `\`${icon}\``
          }
        })
      }
    })
  }).readOnly(),

  actions: {
    colorSelected (color) {
      this.set('backgroundColor', color)
    }
  }
})
