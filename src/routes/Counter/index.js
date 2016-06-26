import Counter from './containers';
import store from '../../redux/store';
import bindHooks from '../hooks';
const hooks = bindHooks(store);

export default {
  path: '/counter',
  component: Counter
};
