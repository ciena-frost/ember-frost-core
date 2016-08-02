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
      'ember-lodash'
    ].map((packageName) => {
      return {name: packageName}
    })

    return this.removePackagesFromProject(packagesToRemove)
      .then(() => {
        return this.addPackagesToProject([
          {name: 'svg4everybody', target: '^2.0.3'},
          {name: 'lodash', target: '^4.14.1'}, // Used by this addons index.js
          {name: 'redux', target: '^3.4.0'},
          {name: 'redux-thunk', target: '^2.0.1'}
        ])
      })
      .then(() => {
        return this.addBowerPackagesToProject([
          {name: 'perfect-scrollbar', target: '>=0.6.7 <2.0.0'}
        ])
      })
      .then(() => {
        return this.addAddonsToProject({
          packages: [
            {name: 'ember-browserify', target: '^1.1.9'},
            {name: 'ember-concurrency', target: '^0.7.8'},
            {name: 'ember-computed-decorators', target: '>=0.2.2 <2.0.0'},
            {name: 'ember-hook', target: '1.2.1'},
            {name: 'ember-lodash-shim', target: '>=0.1.0 <2.0.0'},
            {name: 'ember-one-way-controls', target: '>=0.5.3 <2.0.0'},
            {name: 'ember-truth-helpers', target: '^1.0.0'},
            {name: 'ember-redux', target: '^1.0.0'}
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
