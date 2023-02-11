import { combineReducers } from 'redux';
import advts from './advts'
import advtKinds from './advtKinds'
import advtTypes from './advtTypes'
import advtTypesKinds from './advtTypesKinds'
import dealTypes from './dealTypes'
import sources from './sources'
import localities from './localities'
import regions from './regions'
import auth from './auth'

export default combineReducers({
    advts,
    advtKinds,
    advtTypes,
    advtTypesKinds,
    dealTypes,
    sources,
    localities,
    regions,
    auth
});