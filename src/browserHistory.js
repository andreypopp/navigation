/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import createBrowserHistory from 'history/lib/createBrowserHistory';
import withReactiveLocation from './withReactiveLocation';

let createHistory = withReactiveLocation(createBrowserHistory);

export default createHistory();
