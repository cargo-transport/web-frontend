import { throttle } from 'lodash';

const saveState = throttle(state => {
  localStorage.setItem('appState', JSON.stringify(state));
}, 1000);

export default function persist({ getState }) {
  return (next) => (action) => {
    const result = next(action);
    const { accessToken, username, email, createdAt, verifiedAt } = getState().auth;
    saveState({
      auth: {
        accessToken,
        username,
        email,
        createdAt,
        verifiedAt
      }
    });
    return result;
  };
}
