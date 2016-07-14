/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import {atom} from 'derivable';
import {locationsAreEqual} from 'history';

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

    let nativePush = history.push;
    let nativeReplace = history.replace;

    history.location = location.lens({
      get: (loc) => loc,
      set: (loc, nextLoc) => {
        nativePush(nextLoc);
        return history.getCurrentLocation();
      }
    });

    history.listen(nextLocation => {
      if (nextLocation.action === 'POP') {
        history.location.set(nextLocation);
      }
    });

    history.push = location => {
      let ret = nativePush(location);
      history.location.set(history.getCurrentLocation());
      return ret;
    };

    history.replace = location => {
      let ret = nativeReplace(location);
      history.location.set(history.getCurrentLocation());
      return ret;
    };

    return history;
  };
}
