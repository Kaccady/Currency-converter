import { combineReducers } from 'redux';
import { data, dataHasErrored, dataIsLoading } from './data';

export default combineReducers({
    data,
    dataHasErrored,
    dataIsLoading
});