import axios from "axios";
import { LOAD_LEADERBOARD, GET_ERRORS, GET_PROFILE } from "./types";
import { logoutUser } from "./authActions";

// load leaderboard
export const loadLeaderboard = () => dispatch => {
  axios
    .get("/api/user/leaderboard")
    .then(res => {
      dispatch({
        type: LOAD_LEADERBOARD,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// get public profile of user
export const getProfile = (username, history) => dispatch => {
  axios
    .get("/api/user/u/" + username)
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      history.push("/");
    });
};

// change profile bio
export const changeDescription = req => dispatch => {
  axios
    .post("/api/user/profile/" + req.type, { data: req.data })
    .then(res => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// delete user
export const deleteUser = history => dispatch => {
  axios
    .delete("/api/user/delete")
    .then(res => {
      dispatch(logoutUser());
      dispatch({
        type: GET_PROFILE,
        payload: {}
      });
      history.push("/");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
