module.exports = {
  afterInstall: function () {
    const packagesToRemove = [
      'ember-frost-button',
      'ember-frost-checkbox',
      'ember-frost-css-core',
      'ember-frost-icons',
      'ember-frost-link',
      'ember-frost-loading',
      'ember-frost-password',
      'ember-frost-select',
      'ember-frost-text',
      'ember-frost-textarea',
      'ember-frost-theme',
      'svg4everybody'
    ].map((packageName) => {
      return {name: packageName}
    })

    return this.removePackagesFromProject(packagesToRemove)
      .then(() => {
        return this.addAddonsToProject({
          packages: [
            {name: 'ember-concurrency', target: '~0.7.15'},
            {name: 'ember-computed-decorators', target: '~0.2.0'},
            {name: 'ember-elsewhere', target: '~0.4.1'},
            {name: 'ember-frost-test', target: '^1.0.0'},
            {name: 'ember-prop-types', target: '^3.0.0'},
            {name: 'ember-spread', target: '^1.0.0'},
            {name: 'ember-truth-helpers', target: '^1.2.0'}
          ]
        })
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter to us)
  }
}
