import * as types from "../actions/actionTypes";
import intialState from "./intialState";


export default function courseReducer(state=intialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, { ...action.course }];
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}