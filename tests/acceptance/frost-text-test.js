/* jshint expr:true */
import {
  describe,
  it,
  beforeEach,
  afterEach
} from 'mocha';
import { expect } from 'chai';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';

describe('Acceptance: FrostText', function() {
  let application;

  beforeEach(function() {
    application = startApp();
  });

  afterEach(function() {
    destroyApp(application);
  });

  it('can visit /frost-text', function() {
    visit('/field');

    fillIn('.frost-text-input', 'test');

    
    andThen(function() {
      expect(find('.frost-text').hasClass('is-clear-visible')).to.be.true;
    });
  });
});
