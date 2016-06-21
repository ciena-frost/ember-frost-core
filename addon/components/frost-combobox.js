import FrostSelect from './frost-select'
import layout from '../templates/components/frost-combobox'

let FrostComboBox = FrostSelect.extend({
  layout,

  getLabel (item) {
    return item.value
  },

  getClassName (items) {
    let className = ''
    if (this.get('open') && items.length) {
      className += ' open'
    }
    return className
  },

  filterItems (items, filter) {
    const filteredItems = this._super(this.get('data'), filter)

    // If no items match filter go ahead and return all items
    if (filteredItems.length === 0) {
      return this._super(this.get('data'), '')
    }

    return filteredItems
  },

  select (index) {
    let selected = [index]
    let values = this.getValues(selected)
    this.setProperties({open: false, selected: selected, filter: values[0]})
    this.get('onChange')(values)
  }
})

export default FrostComboBox
