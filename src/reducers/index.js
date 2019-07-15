import { combineReducers } from 'redux';
import authenticator from './authentication';
import errors from './errors';
export default combineReducers({
  user: authenticator,
  errors,
});
