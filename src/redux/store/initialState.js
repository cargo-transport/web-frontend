import { merge } from 'lodash';
import * as auth from '../modules/auth';

/**
 * Module clears appState in localStorage in case version change ocured
 * and also makes sure to load and parse the appState in localStorage
 * if present and valid JSON
 */

/*  global __VERSION__  */
// Make sure to reset localStorage in case there is a version update
// if (localStorage.getItem('version') !== __VERSION__) {
//   localStorage.clear();
//   localStorage.setItem('version', __VERSION__);
// }

let initialState = localStorage.getItem('appState');

if (typeof initialState === 'string') {
  try {
    initialState = JSON.parse(initialState);
    if (initialState.search && initialState.search.showSearchOverlay) {
      initialState.search.showSearchOverlay = false;
    }
  } catch (e) {
    initialState = undefined;
  }
} else {
  initialState = undefined;
}

export default merge({}, { auth: auth.initialState }, initialState);
