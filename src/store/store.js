import {createStore,combineReducers} from 'redux';
import userReducer from './reducers/userReducer';

const reducer = combineReducers({
    users:userReducer
});

export const store = createStore(reducer);
