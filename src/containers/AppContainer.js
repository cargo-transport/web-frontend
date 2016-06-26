import React, { PropTypes } from 'react';
import { Router } from 'react-router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import routes from '../routes';

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routerKey: PropTypes.number
  }

  render() {
    const { history, routerKey } = this.props;

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={history} children={routes} key={routerKey} />
        </div>
      </Provider>
    );
  }
}

export default AppContainer;
