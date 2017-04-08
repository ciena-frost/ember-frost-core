import config from '../config/environment'

export default function () {
  if (config && config.mirageNamespace) {
    this.namespace = config.mirageNamespace
  }

  this.get('/links/:id', function (db, request) {
    let id = request.params.id

    return {
      data: {
        type: 'links',
        id: id,
        attributes: db.links.find(id)
      }
    }
  })

  this.get('/nodes', function ({db}) {
    return {
      data: db.nodes
    }
  })

  this.passthrough()
}
