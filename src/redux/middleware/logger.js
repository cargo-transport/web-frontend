const isLogState = false;
/**
 * Logs previous and current state for every action call
 * @param getState
 * @returns {Function}
 */
export default function logger({ getState }) {
  return (next) => (action) => {
    if (isLogState) {
      console.log('previous state', getState());// eslint-disable-line
    }

    if (__DEV__) {
      console.log('dispatching', action);// eslint-disable-line
    }

    const result = next(action);

    if (isLogState) {
      console.log('next state', getState());// eslint-disable-line
    }

    return result;
  };
}
