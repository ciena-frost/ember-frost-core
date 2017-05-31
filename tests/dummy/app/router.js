import config from './config/environment'
import Ember from 'ember'
const {Router: EmberRouter} = Ember

var Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
})

Router.map(function () {
  this.route('demo', {path: '/'})
  this.route('bookends')
  this.route('button')
  this.route('checkbox')
  this.route('palette')
  this.route('icons')
  this.route('layout')
  this.route('link', function () {
    this.route('min')
    this.route('middle')
    this.route('max')
    this.route('first', {path: '/first/:first_id'}, function () {
      this.route('second', {path: '/second/:second_id'})
    })
  })
  this.route('loading')
  this.route('password')
  this.route('radio')
  this.route('scroll')
  this.route('select')
  this.route('area')
  this.route('field')
  this.route('toggle')
  this.route('expand')
  this.route('ajax-error-page')
  this.route('typography')
  this.route('helpers')
})

export default Router
