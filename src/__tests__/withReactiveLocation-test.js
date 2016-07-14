/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import assert from 'assert';
import withReactiveLocation from '../withReactiveLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';

function timeout(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe('navigation.withReactiveLocation', function() {

  let createHistory = withReactiveLocation(createMemoryHistory);

  it('adds reactive location', function() {
    let history = createHistory();
    assert(history.location);
  });

  it('reactive location has initial location value', function() {
    let history = createHistory();
    let loc = history.location.get();
    assert(loc);
    assert.equal(loc.pathname, '/');
  });

  it('location can be set via reactive location value', function() {
    let history = createHistory();
    history.location.set('/path');
    let loc = history.getCurrentLocation();
    assert(loc);
    assert.equal(loc.pathname, '/path');
    assert.equal(history.location.get().pathname, '/path');
  });

  it('reactive location updates on push', function() {
    let history = createHistory();
    assert.equal(history.location.get().pathname, '/');
    history.push('/about');
    assert.equal(history.location.get().pathname, '/about');
  });

  it('reactive location updates on push', function() {
    let history = createHistory();
    assert.equal(history.location.get().pathname, '/');
    history.replace('/about');
    assert.equal(history.location.get().pathname, '/about');
  });

  it('reactive location updates on goBack()/goForward()', function() {
    let history = createHistory();
    assert.equal(history.location.get().pathname, '/');
    history.push('/about');
    assert.equal(history.location.get().pathname, '/about');
    history.goBack();
    assert.equal(history.location.get().pathname, '/');
    history.goForward();
    assert.equal(history.location.get().pathname, '/about');
  });

  it('reactive location updates on go()', function() {
    let history = createHistory();
    assert.equal(history.location.get().pathname, '/');
    history.push('/about');
    assert.equal(history.location.get().pathname, '/about');
    history.go(-1);
    assert.equal(history.location.get().pathname, '/');
    history.go(1);
    assert.equal(history.location.get().pathname, '/about');
  });

});
