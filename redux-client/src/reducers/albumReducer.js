import { FETCH_ALBUMS } from "../actions/types";

const initialState = {
  items: [],
  input: {},
  result: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ALBUMS:
      return {
        ...state,
        items: action.data,
      };

    default:
      return state;
  }
}
