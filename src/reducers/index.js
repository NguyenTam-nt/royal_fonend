import { combineReducers } from "redux";
import user from "./user";
import animation from "./animation";
import posts from "./post";
import modal from "./modal";
import notify from "./notify";
import message from "./message";

const myReducer = combineReducers({
  user,
  animation,
  posts,
  modal,
  notify,
  message,
});

export default myReducer;
