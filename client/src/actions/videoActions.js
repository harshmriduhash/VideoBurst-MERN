import axios from "axios";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  LIST_VIDEOS,
  PLAY_VIDEO,
  CLOSE_VIDEO,
  UPDATE_NOW_PLAYING
} from "./types";

// add video and reload feed
export const addVideo = videoUrl => dispatch => {
  axios
    .post("/api/video/add", videoUrl)
    .then(res => {
      dispatch(loadVideos());
      dispatch({
        type: CLEAR_ERRORS
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// like or dislike video
export const likeVideo = (video, nowPlaying) => dispatch => {
  axios
    .post("/api/video/like/" + video.videoId)
    .then(res => {
      if (video.videoId === nowPlaying.videoId) {
        dispatch({
          type: UPDATE_NOW_PLAYING,
          payload: res.data
        });
      }
      dispatch(loadVideos());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// delete video
export const deleteVideo = (video, nowPlaying) => dispatch => {
  axios
    .delete("/api/video/delete/" + video.videoId)
    .then(res => {
      if (video.videoId === nowPlaying.videoId) {
        dispatch({
          type: UPDATE_NOW_PLAYING,
          payload: {}
        });
      }
      dispatch(loadVideos());
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

// load set of videos on main page
export const loadVideos = () => dispatch => {
  axios
    .get("/api/video/all")
    .then(res => {
      dispatch({
        type: LIST_VIDEOS,
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

// select video to play
export const playVideo = video => dispatch => {
  dispatch({
    type: PLAY_VIDEO,
    payload: video
  });
};

// remove video (close player)
export const closeVideo = () => dispatch => {
  dispatch({
    type: CLOSE_VIDEO
  });
};
