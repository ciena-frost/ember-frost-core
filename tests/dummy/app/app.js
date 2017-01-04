import config from './config/environment'
import Ember from 'ember'
import loadInitializers from 'ember-load-initializers'
import Resolver from 'ember-resolver'
const {Application} = Ember

let App

Ember.MODEL_FACTORY_INJECTIONS = true

App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

export default App
