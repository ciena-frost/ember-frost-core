import Ember from 'ember'
import config from './config/environment'
import addRoute from 'frost-guide-custom-routing/utils/addRoute'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  let routerConfig = config.APP.routingConfig
  routerConfig.forEach((item) => {
    addRoute.call(this, item)
  })
  this.route('demo', { path: '/' })
  this.route('checkbox')
  this.route('icons')
//  this.route('text-input', function () {
//    this.route('field', { path: '/field' })
//    this.route('area', { path: '/area' })
//  })
})

export default Router
