import config from './config/environment'
import Ember from 'ember'
import loadInitializers from 'ember-load-initializers'
import Resolver from './resolver'
const {Application} = Ember

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
})

loadInitializers(App, config.modulePrefix)

export default App
