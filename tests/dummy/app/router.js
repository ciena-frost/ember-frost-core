import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('demo', { path: '/' })
  this.route('checkbox')
  this.route('icons')
  this.route('theme', function () {
    this.route('palette', { path: '/palette' })
    this.route('typography', { path: '/typography' })
  })
})

export default Router
