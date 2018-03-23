/**
 * @overview initializes router with frost-page-title service
 */

export function initialize (application) {
  application.inject('router', 'frost-page-title', 'service:frost-page-title')
}

export default {
  name: 'frost-page-title',
  initialize
}
