import FrostSelect from './frost-select'
import PropTypeMixin from 'ember-prop-types'

export default FrostSelect.extend(PropTypeMixin, {
  getDefaultProps () {
    return {
      multiselect: true
    }
  }
})
