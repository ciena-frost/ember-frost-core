import Ember from 'ember'

export function initialize (application) {
  application.deferReadiness()

  return Ember.$.get('assets/assetMap.json')
    .then((assetMap) => {
      application.register('icon-assets:main', Ember.Object.extend(assetMap.assets))
      application.inject('component:frost-icon', '_iconAssets', 'icon-assets:main')
    }).always(() => application.advanceReadiness())
}

export default {
  name: 'icon-assets',
  initialize
}
