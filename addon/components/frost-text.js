import Ember from 'ember'
import FrostComponent from '../mixins/frost-component'
import computed from 'ember-computed-decorators'

const {
  TextField
} = Ember
const {
  next,
  schedule
} = Ember.run

export default TextField.extend(FrostComponent, {
  // == Properties =============================================================
  attributeBindings: [
    'style'
  ],
  classNames: [
    'frost-text'
  ],

  // == Computed properties ====================================================
  @computed('align')
  style (align) {
    return Ember.String.htmlSafe(`text-align: ${CSS.escape(align)}`)
  },

  // == Event hooks ============================================================

  didRender () {
    schedule('render', this, function () {
      this.$().after(`
        <svg class='frost-text-clear' fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      `)
      next(this, function () {
        this.$().next().click(() => {
          this.onClear()
        })
      })
    })
  },

  // == Functions ==============================================================

  onClear () {
    this.$().focus()
    this.$().val('')
    this.$().trigger('input')
  }
})
