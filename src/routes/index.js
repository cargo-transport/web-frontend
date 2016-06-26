import CoreLayout from '../layouts/CoreLayout/CoreLayout';
import Home from './Home';
import CounterRoute from './Counter';
// import Auth from './Auth';
import bindHooks from './hooks';
import store from '../redux/store';
const hooks = bindHooks(store);

export default {
  path: '/',
  component: CoreLayout,
  indexRoute: Home,
  childRoutes: [
    // Auth,
    CounterRoute
  ]
};
