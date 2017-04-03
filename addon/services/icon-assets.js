import Ember from 'ember'
const { inject, Service } = Ember

const iconPath = 'assets/icon-packs'
const iconAssets = 'assets/icon-assets.json'

export default Service.extend({
  ajax: inject.service(),
  _icons: [],
  init () {
    this._super(...arguments)

    this.get('ajax')
      .request(iconAssets)
      .then((result) => {this._assets = result.assets})
      .finally(() => this._loadIcons())
  },
  register (element) {
    const path = `${iconPath}/${element.get('pack')}.svg`

    const icon = {
      element,
      path
    }

    if (this._icons !== undefined) { // assets have yet to resolve
      this._icons.push(icon)
    } else {
      this._load(icon)
    }
  },
  _loadIcons () {
    const assets = this._assets || {}
    this._icons.forEach(el => this._load(el))
    delete this._icons
  },
  _load (icon) {
    const {element, path} = icon
    const href = this._assets[path] || path
    element.get('iconTask').perform(href)
  }
})
