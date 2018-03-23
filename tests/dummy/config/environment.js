/* eslint-env node */
module.exports = function (environment) {
  let ENV = {
    modulePrefix: 'dummy',
    podModulePrefix: 'dummy/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      },
      iconPacks: {
        inline: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },
    APP: {
      'frost-page-title-default': 'ember-frost-core tests'
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    'ember-cli-notifications': {
      autoClear: false
    },
    'ember-prop-types': {
      spreadProperty: 'options',
      throwErrors: true,
      validateOnUpdate: true
    }
  }

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true
    // ENV.APP.LOG_ACTIVE_GENERATION = true
    // ENV.APP.LOG_TRANSITIONS = true
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true
    // ENV.APP.LOG_VIEW_LOOKUPS = true
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none'

    ENV['ember-cli-mirage'] = {
      enabled: true
    }

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false
    ENV.APP.LOG_VIEW_LOOKUPS = false

    ENV.APP.rootElement = '#ember-testing'
  }

  if (environment === 'production') {
    ENV.rootURL = '/ember-frost-core'
    ENV.isDemo = true
    ENV.mirageNamespace = 'https://ciena-frost.github.io'
    ENV['ember-cli-mirage'] = {
      enabled: true
    }
  }

  return ENV
}
