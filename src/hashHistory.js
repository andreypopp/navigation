/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import createHashHistory from 'history/lib/createHashHistory';
import withReactiveLocation from './withReactiveLocation';

let createHistory = withReactiveLocation(createHashHistory);

export default createHistory();

