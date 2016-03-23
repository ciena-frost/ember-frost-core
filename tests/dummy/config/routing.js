module.exports = [
  {
    id: 'text-input',
    alias: 'Demo',
    type: 'category',
    route: 'text-input',
    items: [{
      id: 'field',
      alias: 'Field',
      type: 'route',
      route: 'text-input.field',
      path: {
        path: '/field'
      }
    }, {
      id: 'area',
      alias: 'area',
      type: 'route',
      route: 'text-input.area',
      path: {
        path: '/area'
      }
    }]
  }
]
