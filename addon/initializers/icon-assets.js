export function initialize (application) {
  application.deferReadiness()

  return $.get('assets/assetMap.json').then((assetMap) => {
    application.register('icon-assets:main', Ember.Object.extend(assetMap.assets))
    application.inject('component', 'iconAssets', 'icon-assets:main');
    application.advanceReadiness()
  })
}

export default {
  name: 'icon-assets',
  initialize
};
