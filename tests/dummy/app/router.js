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
  this.route('button')
  this.route('field')
  this.route('area')
  this.route('password')
  this.route('palette')
  this.route('typography')
  this.route('layout')
  this.route('link', function () {
    this.route('min', {path: '/min'})
  })
})

export default Router
