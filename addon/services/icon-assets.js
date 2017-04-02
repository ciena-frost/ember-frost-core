/**
 * Service definition for the icon-assets service
 */

import Ember from 'ember'
import task from 'ember-concurrency'
const {Service} = Ember

export default Service.extend({
  _icons: [],
  init () {
    this._super(...arguments)
    Ember.$.get('assets/assetMap.json').then((assetMap) => {
      this._assets = assetMap.assets
      this._icons.forEach(icon => {
        const pack = icon.get('pack')
        icon.set('iconPath', assetMap.assets[`assets/icon-packs/${pack}.svg`])
      })
    }).fail(() => {
      this._icons.forEach(icon => {
        const pack = icon.get('pack')
        icon.set('iconPath', `assets/icon-packs/${pack}.svg`)
      })
    }).always(() => delete this._icons)
  },
  register (icon) {
    const pack = icon.get('pack')
    if (this._assets) {
      icon.set('iconPath', this._assets[`assets/icon-packs/${pack}.svg`])
    } else if (this._icons !== undefined) {
      this._icons.push(icon)
    } else {
      icon.set('iconPath', `assets/icon-packs/${pack}.svg`)
    }
  }
})
