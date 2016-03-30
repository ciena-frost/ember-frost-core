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

  getValid (filter) {
    let valid = []

    this.get('data').forEach((record, index) => {
      if (!filter || this.getLabel(record).toLowerCase().indexOf(filter.toLowerCase()) !== -1) {
        valid.push({
          index,
          value: record.value,
          label: this.getLabel(record)
        })
      }
    })

    if (!valid.length) {
      this.get('data').forEach((record, index) => {
        valid.push({
          index,
          value: record.value,
          label: this.getLabel(record)
        })
      })
    }

    return valid
  },

  select (index) {
    let selected = [index]
    let values = this.getValues(selected)
    this.setProperties({open: false, selected: selected, filter: values[0]})
    this.get('onChange')(values)
  }
})

export default FrostComboBox
