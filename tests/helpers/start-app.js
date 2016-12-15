import Ember from 'ember'
const {run} = Ember
import Application from '../../app'
import config from '../../config/environment'

const assign = Ember.assign || Object.assign || Ember.merge || function (assignee, assigner) {
  const target = Object(assignee)
  const source = Object(assigner)

  Object.keys(source).forEach(el => {
    target[el] = source[el]
  })
  return target
}

export default function startApp (attrs) {
  let application

  let attributes = assign({}, config.APP)
  attributes = assign(attributes, attrs) // use defaults, but you can override

  run(() => {
    application = Application.create(attributes)
    application.setupForTesting()
    application.injectTestHelpers()
  })

  return application
}
