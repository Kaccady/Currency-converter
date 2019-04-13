import { combineReducers } from "redux";
import { data, dataHasErrored, dataIsLoading } from "./data";
import { favouriteOptions } from "./favouriteOptions";

export default combineReducers({
  data,
  dataHasErrored,
  dataIsLoading,
  favouriteOptions,
});
