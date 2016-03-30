import config from '../config/environment'

export default function () {
  if (config && config.isDemo) {
    this.namespace = 'https://ciena-frost.github.io'
  }

  this.get('/nodes', function (db) {
    return {
      data: db.nodes
    }
  })

  this.passthrough()
}
