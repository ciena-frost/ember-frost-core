import Ember from 'ember'
import config from './config/environment'
import addRoute from 'frost-guide-custom-routing/utils/addRoute'
import demoRoutes from './demo-routes'

var Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  let routerConfig = config.APP.routingConfig
  routerConfig.forEach((item) => {
    addRoute.call(this, item)
  })
  this.route('demo', { path: '/' })

  demoRoutes.forEach((route) => {
    this.route(route.routeName)
  })
})

export default Router
