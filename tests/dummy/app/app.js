import Application from '@ember/application'
import config from './config/environment'
import loadInitializers from 'ember-load-initializers'
import Resolver from './resolver'

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

export default App
