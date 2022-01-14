import counterReducer from './counter';
import tokenReducer from './token';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    token: tokenReducer
});
export default allReducers;