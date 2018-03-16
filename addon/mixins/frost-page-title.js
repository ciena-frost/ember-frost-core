/**
 * @overview Mixin for custom page title handling on any route
 */

import Ember from 'ember'

const {Mixin, inject: {service}} = Ember

export default Mixin.create({
  activate () {
    this._super(...arguments)

    const titleService = this.get('frostPageTitleService')
    const sections = titleService.get('sections')

    // if given a handler, call it with the already generated title sections
    // and the default title
    if (typeof this.frostPageTitle === 'function') {
      titleService.set(
        'sections',
        this.frostPageTitle(sections, titleService.get('defaultTitle'))
      )
    }
  },

  frostPageTitleService: service('frost-page-title')
})
