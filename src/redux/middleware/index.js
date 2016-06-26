import thunk from 'redux-thunk';
import logger from './logger';
import request from './request';
import persist from './persist';

export default [
  thunk,
  request,
  logger,
  persist
];
