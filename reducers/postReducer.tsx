import { FETCH_POST, PostTypes } from "actions/types";

type Action = { type: PostTypes; payload: any };

const initialState = {
  items: [],
  item: {},
};

export default function postReducer(state = initialState, action: Action) {
  switch (action.type) {
    case PostTypes.FETCH_POST:
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}
