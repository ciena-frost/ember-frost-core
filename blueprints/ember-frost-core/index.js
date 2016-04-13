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
      'ember-frost-theme'
    ].map((packageName) => {
      return {name: packageName}
    })

    return this.removePackagesFromProject(packagesToRemove)
      .then(() => {
        return this.addBowerPackagesToProject([
          {name: 'lodash', target: '^4.10.0'},
          {name: 'perfect-scrollbar', target: '>=0.6.7 <2.0.0'}
        ])
      })
      .then(() => {
        return this.addAddonsToProject({
          packages: [
            {name: 'ember-computed-decorators', target: '>=0.2.2 <2.0.0'},
            {name: 'ember-lodash', target: '>=0.0.6 <2.0.0'},
            {name: 'ember-one-way-controls', target: '>=0.5.3 <2.0.0'}
          ]
        })
      })
  },

  normalizeEntityName: function () {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  }
}
