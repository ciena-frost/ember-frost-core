const consumer = require('../../../../lib/utils/consumer')
const expect = require('chai').expect

describe('Unit / Lib / Utils / Consummer', () => {
  const options = {
    project: {
      pkg: {
        devDependencies: {'package1': '0.0.1'},
        dependencies: {'package2': '0.0.2'}
      }
    }
  }

  it('getPackages', () => {
    const result = consumer.getPackages(options)
    expect(result['package1']).to.eql('0.0.1')
    expect(result['package2']).to.eql('0.0.2')
  })
})
