/**
 * Component definition for the frost-bookends component
 */

import Ember from 'ember'
const {run} = Ember
import layout from '../templates/components/frost-bookends'
import {Component} from 'ember-frost-core'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  layout,

  // == PropTypes =============================================================

  propTypes: {
    // options
    content: PropTypes.EmberComponent,
    footer: PropTypes.EmberComponent.isRequired,
    header: PropTypes.EmberComponent.isRequired,

    // state
    isContentScrolledBeneathFooter: PropTypes.bool,
    isContentScrolledBeneathHeader: PropTypes.bool
  },

  getDefaultProps () {
    return {
      // options

      // state
      isContentScrolledBeneathFooter: false,
      isContentScrolledBeneathHeader: false
    }
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  // == DOM Events ============================================================

  // == Lifecycle Hooks =======================================================

  /**
   * Since we don't get a scroll event from frost-scroll on initial rendering, we need one more check, after
   * the content first renders, to see if it extends below the footer.
   */
  didInsertElement () {
    const classNameBase = this.get('css')
    const scroll = this.$(`.${classNameBase}-scroll`).get(0)
    if (scroll.scrollHeight > scroll.clientHeight) {
      run.schedule('sync', () => {
        this.set('isContentScrolledBeneathFooter', true)
      })
    }
  },

  // == Actions ===============================================================

  actions: {
    /**
     * When we reach the end of scrolling vertically, we no longer have content beneath the footer, so we
     * clear the flag that would show the shadow effect on that edge.
     */
    hideContentBeneathFooterEffect () {
      this.set('isContentScrolledBeneathFooter', false)
    },

    /**
     * When we reach the start of scrolling vertically, we no longer have content beneath the header, so we
     * clear the flag that would show the shadow effect on that edge.
     */
    hideContentBeneathHeaderEffect () {
      this.set('isContentScrolledBeneathHeader', false)
    },

    /**
     * As soon as we start scrolling down, we know that the content has moved up underneath
     * the header, so we set that property to true to show the shadow effect on that edge.
     */
    showContentBeneathHeaderEffect () {
      this.set('isContentScrolledBeneathHeader', true)
    },

    /**
     * As soon as we start scrolling up, we know that the content has moved up underneath
     * the footer, so we set the flag to show the shadow effect on that edge.
     */
    showContentBeneathFooterEffect () {
      this.set('isContentScrolledBeneathFooter', true)
    }
  }
})
