import { combineReducers } from 'redux';

import viewReducer from './viewReducer';

const rootReducers = combineReducers({
    view: viewReducer
});

export default rootReducers;