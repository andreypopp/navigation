/**
 * @copyright 2016-present, Andrey Popp <8mayday@gmail.com>
 */

import createMemoryHistory from 'history/lib/createMemoryHistory';
import withReactiveLocation from './withReactiveLocation';

let createHistory = withReactiveLocation(createMemoryHistory);

export default createHistory();


