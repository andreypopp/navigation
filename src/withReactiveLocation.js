/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import {atom} from 'derivable';

/**
 * Enhance `createHistory` with reactive location value.
 *
 * @example
 *
 * import createHistory from 'history/lib/browserHistory'
 * import {withReactiveLocation} from 'reactive-navigation'
 *
 * let history = withReactiveLocation(createHistory)()
 *
 * history.location.react(location => {
 *   //
 * })
 *
 * history.location.set('/next/location')
 */
export default function withReactiveLocation(createHistory) {
  return function createHistoryWithReactiveLocation(options) {
    let history = createHistory(options);
    let location = atom(history.getCurrentLocation());
    history.location = location.lens(createLocationLens(history));
    history.listen(nextLocation => location.set(nextLocation));
    return history;
  };
}

function createLocationLens(history) {
  return {
    get(location) {
      return location;
    },
    set(location, nextLocation) {
      if (nextLocation.replace) {
        history.replace(nextLocation);
      } else {
        history.push(nextLocation);
      }
    }
  };
}
