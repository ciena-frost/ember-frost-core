import Ember from 'ember'
const {Route} = Ember
import routes from '../../demo-routes'

export default Route.extend({
  model () {
    return Promise.resolve({routes})
  }
})
