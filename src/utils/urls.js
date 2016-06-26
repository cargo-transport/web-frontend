import qs from 'qs';

const { protocol } = window.location;

export const host = window.location.hostname === 'logos.dev'
  ? 'development.logos.social' // in case its the local environment connect to development
  : window.location.host; // in case its other then local detect host dynamically

export const api = `${protocol}//api.${host}`;


export const authStatusUsername = (username) =>
  `${api}/auth/v1/status/username/${username}`;

export const authSignin = () =>
  `${api}/auth/v1/signin`;

export const authSignout = () =>
  `${api}/auth/v1/signout`;

export const authSignup = () =>
  `${api}/auth/v1/signup`;

export const authSocialLoginCallback = (query) =>
  `${api}/auth/v1/social/callback?${qs.stringify(query)}`;

export const authMe = (token) =>
  token
    ? `${api}/auth/v1/me?rt=${token}`
    : `${api}/auth/v1/me`;

export const authVerifyUser = (token) => `${api}/auth/v1/me/verification?vt=${token}`;
export const authResendVerificationLink = () => `${api}/auth/v1/me/resendVerificationLink`;

export const authPasswordReset = () =>
  `${api}/auth/v1/me/reset`;

export const authPasswordResetToken = (token) =>
  `${api}/auth/v1/me/recovery/${token}`;

