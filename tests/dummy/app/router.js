import Ember from 'ember'
import config from './config/environment'

var Router = Ember.Router.extend({
  location: config.locationType
})

Router.map(function () {
  this.route('demo', { path: '/' })
  this.route('checkbox')
  this.route('icons')
  this.route('text-input', function () {
    this.route('field', { path: '/field' })
    this.route('area', { path: '/area' })
  })
})

export default Router
