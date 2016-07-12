/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import assert from 'assert';
import withReactiveLocation from '../withReactiveLocation';
import createMemoryHistory from 'history/lib/createMemoryHistory';

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
  });

});
