import resolver from './helpers/resolver'
import { setResolver } from 'ember-mocha'
import { mocha } from 'mocha'

mocha.setup({
  // customize as needed
  timeout: 5000
})
setResolver(resolver)
