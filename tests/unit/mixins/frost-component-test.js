/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import FrostComponentMixin from 'ember-frost-core/mixins/frost-component';

describe('FrostComponentMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let FrostComponentObject = Ember.Object.extend(FrostComponentMixin);
    let subject = FrostComponentObject.create();
    expect(subject).to.be.ok;
  });
});
