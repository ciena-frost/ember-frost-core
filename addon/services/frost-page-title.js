/**
 * @overview Dynamically overwrites document's title based on a default handler
 * and custom handlers which may be placed on individual routes via the
 * frost-page-title mixin
 */

import Ember from 'ember'
import config from 'ember-get-config'

const {Service} = Ember
const {APP} = config

export default Service.extend({
  defaultHandler () {
    const sections = window.location.hash.match(/[^/]+/g)

    // return default title if we have no hash to work with
    if (!sections) {
      return []
    }

    // filter and map sections to words
    return sections
      .filter(section => !/[^A-Za-z-]/.test(section))
      .map(section => {
        return section.split('-')
          .map(word => Ember.String.capitalize(word))
          .join(' ')
      })
  },

  defaultTitle: APP['frost-page-title-default'],

  resetSections () {
    this.set('sections', this.defaultHandler())
  },

  sections: [],

  updateTitle () {
    const sections = this.get('sections')
    if (sections.length) {
      document.title = sections.join(' | ')
    } else {
      document.title = this.get('defaultTitle')
    }
  }
})
