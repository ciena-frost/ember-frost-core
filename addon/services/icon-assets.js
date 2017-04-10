import Ember from 'ember'
import fetch from 'fetch'

const { RSVP, Service } = Ember

const iconPath = 'assets/icon-packs'
const iconAssets = 'assets/icon-assets.json'

export default Service.extend({
  _assets: {},
  _icons: [],
  init () {
    this._super(...arguments)

    fetch(iconAssets)
      .then(result => result.text())
      .then(raw => {
        let result = {}
        try {
          result = JSON.parse(raw)
        } catch (e) {}

        return result
      })
      .then(iconMap => { this._assets = iconMap.assets || {} })
      .finally(() => this._loadIcons())
  },
  register (element) {
    return new RSVP.Promise(resolve => {
      const path = `${iconPath}/${element.get('pack')}.svg`

      const icon = {
        resolve,
        path
      }

      if (this._icons !== undefined) { // assets have yet to resolve
        this._icons.push(icon)
      } else { // load immediately
        this._load(icon)
      }
    })
  },
  _loadIcons () {
    this._icons.forEach(el => this._load(el))
    delete this._icons
  },
  _load (icon) {
    const path = icon.path
    icon.resolve(this._assets[path] || path)
  }
})
