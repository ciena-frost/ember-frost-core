import { expect } from 'chai';
import { describe, it } from 'mocha';
import { setupTest } from 'ember-mocha';

describe('Unit | Service | icon assets', function() {
  setupTest('service:icon-assets', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  it('exists', function() {
    let service = this.subject();
    expect(service).to.be.ok;
  });
});
