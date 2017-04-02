import Ember from 'ember'
const { Service } = Ember

const ICON_PATH = 'assets/icon-packs'
const ICON_ASSETS = 'assets/icon-assets.json'
export default Service.extend({
  _icons: [],
  init () {
    this._super(...arguments)
    Ember.$.getJSON(ICON_ASSETS).then((assetMap) => {
      this._assets = assetMap.assets
      this._icons.forEach(icon => {
        const pack = icon.get('pack')
        const href = this._assets[`${ICON_PATH}/${pack}.svg`]
        icon.get('iconTask').perform(href)
      })
    }).fail(() => {
      this._icons.forEach(icon => {
        const pack = icon.get('pack')
        const href = `${ICON_PATH}/${pack}.svg`
        icon.get('iconTask').perform(href)
      })
    }).always(() => delete this._icons)
  },
  register (icon) {
    const pack = icon.get('pack')
    let href
    if (this._assets) {
      href = this._assets[`${ICON_PATH}/${pack}.svg`]
    } else if (this._icons !== undefined) { // assets have yet to resolve
      this._icons.push(icon) // queue it up
      return
    } else {
      href = `${ICON_PATH}/${pack}.svg`
    }
    icon.get('iconTask').perform(href)
  }
})
