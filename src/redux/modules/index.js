import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import auth from './auth';
import counter from './counter';

export default combineReducers({
  router,
  auth,
  counter
});
