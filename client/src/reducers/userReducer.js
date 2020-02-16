import { LOAD_LEADERBOARD, GET_PROFILE } from "../actions/types";

const initialState = {
  leaderboard: [],
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOAD_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    default:
      return state;
  }
}
