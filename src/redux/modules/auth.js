import * as urls from '../../utils/urls';
// TODO: This code should be refactored and validation helpers should be
// taken out from both auth and credentials modules otherwise this approach leads
// to confusion and code duplication

const SIGNIN_PENDING = 'auth/SIGNIN_PENDING';
const SIGNIN_SUCCESS = 'auth/SIGNIN_SUCCESS';
const SIGNIN_FAILURE = 'auth/SIGNIN_FAILURE';

const SIGNOUT_PENDING = 'auth/SIGNOUT_PENDING';
const SIGNOUT_SUCCESS = 'auth/SIGNOUT_SUCCESS';
const SIGNOUT_FAILURE = 'auth/SIGNOUT_FAILURE';

const SIGNUP_PENDING = 'auth/SIGNUP_PENDING';
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS';
const SIGNUP_FAILURE = 'auth/SIGNUP_FAILURE';


export const initialState = {
  loading: false,
  error: false,
  message: '',
  passwordResetMessage: '',
  accessToken: null,
  username: '',
  email: '',
  createdAt: null,
  verifiedAt: null
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch (type) {
  case SIGNUP_PENDING:
  case SIGNIN_PENDING:
    return {
      ...initialState,
      loading: true
    };
  case SIGNIN_SUCCESS:
    return {
      ...initialState,
      ...payload
    };
  case SIGNIN_FAILURE:
    return {
      ...initialState,
      ...payload,
      error: true,
      message: 'Signin failed. Please check all fields and try again.'
    };
  case SIGNUP_FAILURE:
    return {
      ...initialState,
      ...payload,
      error: true,
      message: 'Signup failed. Please check all fields and try again.'
    };

  default:
    return state;
  }
}


export function bootstrap() {
  return async(dispatch) => {
    return await Promise.all([
      // dispatch(userActions.fetchMyProfile()),
      // dispatch(libraryActions.fetchShelf()),
      // dispatch(notifications.fetchUnreadCount()),
      // dispatch(intercomActions.boot())
    ]);
  };
}

export function signin(router) {
  return async(dispatch, getState) => {
    // const { username, password } = getState().credentials.fields;

    // const response = await dispatch({
    //   type: [
    //     SIGNIN_PENDING,
    //     SIGNIN_SUCCESS,
    //     SIGNIN_FAILURE
    //   ],
    //   meta: {
    //     fetch: [urls.authSignin(), {
    //       method: 'post',
    //       body: {
    //         username,
    //         password
    //       }
    //     }]
    //   }
    // });

    // // Bootstrap
    // if (response && response.status === 200) {
    //   await dispatch(bootstrap());
    //   return router.transitionTo('/');
    // }

    // return dispatch(resetAuth());
  };
}

export function signup(router) {
  return async(dispatch, getState) => {
    // const { fields: { username, email, password } } = getState().credentials;

    // // before making server request, do a client validation
    // await dispatch(setCredentials(getState().credentials.fields));

    // const { validationErrors } = getState().credentials;

    // for (const field in validationErrors) {
    //   // early exit from signup if there validation errors
    //   if (validationErrors.hasOwnProperty(field) && validationErrors[field].length > 0) {
    //     return undefined;
    //   }
    // }

    // const response = await dispatch({
    //   type: [
    //     SIGNUP_PENDING,
    //     SIGNUP_SUCCESS,
    //     SIGNUP_FAILURE
    //   ],
    //   meta: {
    //     fetch: [urls.authSignup(), {
    //       method: 'post',
    //       body: {
    //         username,
    //         email,
    //         password
    //       }
    //     }]
    //   }
    // });


    // // if there is no response - exit
    // if (!response) return undefined;

    // if (response.body && response.body.username) return dispatch(signin(router));

    // if (response.body && response.body.error) {
    //   const errorFields = {};

    //   Object.keys(response.body.invalidAttributes).forEach((field) => {
    //     errorFields[field] = { message: '' };
    //   });

    //   return dispatch(serverValidationErrors(errorFields));
    // }
  };
}

