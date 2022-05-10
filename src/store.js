import { createStore } from "redux";
import { combineReducers } from "redux";
import movieReducer from "../src/reducers/movieReducer";
const rootReducer = combineReducers({
  movies: movieReducer
});
const store = createStore(rootReducer);
export default store;
