import * as authActions from '../redux/modules/auth';

export default function bindHooks(store) {
  const { getState, dispatch } = store;

  // Each hook will receive as arguments:
  // (nextState, transition)
  // nextState contains params and transition can be used
  // to redirect, cancel, etc.

  return {
    boot: async({ location }, transition, next) => {
      const { pathname } = location;

      // If no accessToken is present transition to /page/intro.html
      // if not already there and return next
      if (!getState().auth.accessToken) {
        if (!pathname.includes('/account')) {
          // transition.to('/account/signin');

          // As /page/intro.html is not part of the SPA change location pathname
          window.location.pathname = '/page/intro.html';
        }

        return next();
      }

      // If accessToken is present run bootstrap
      await dispatch(authActions.bootstrap());

      // if we got an error while the bootstrap was running we transition back to the signin
      if (getState().auth.error) {
        if (!pathname.includes('/account')) transition.to('/account/signin');
        return next();
      }

      // if everything went well just return next after the bootstrap
      return next();
    }
  };
}
