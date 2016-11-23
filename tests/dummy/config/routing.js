module.exports = [
  {
    id: 'link',
    alias: 'Demo',
    type: 'route',
    route: 'link',
    items: [{
      id: 'min',
      alias: 'First',
      type: 'route',
      route: 'link.min'
    },
    {
      id: 'max',
      type: 'route',
      route: 'link.max'
    },
    {
      id: 'middle',
      type: 'route',
      route: 'link.middle'
    }]
  }
]
