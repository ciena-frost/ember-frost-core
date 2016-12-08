import DS from 'ember-data'

let Model = DS.Model.extend({
  text: DS.attr('string')
})

export default Model
