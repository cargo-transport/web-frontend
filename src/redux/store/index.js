import { applyMiddleware, compose, createStore } from 'redux';
import rootReducer from '../modules';
import initialState from './initialState';
import middleware from '../middleware';

// ======================================================
// Store Enhancers
// ======================================================
const enhancers = [];
if (__DEBUG__) {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

// ======================================================
// Store Instantiation and HMR Setup
// ======================================================
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...enhancers
  )
);

if (module.hot) {
  module.hot.accept('../modules', () => {
    store.replaceReducer(rootReducer);
  });
}

export default store;
