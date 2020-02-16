const assert = require("assert");
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const youtubeUrl = require("youtube-url");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const secretOrKey = require("../../config/keys").secretOrKey;
const youtubeApiKey = require("../../config/keys").youtubeApiKey;
const passport = require("passport");
const bcrypt = require("bcryptjs");

const Video = require("../../models/Video");
const User = require("../../models/User");

// @route   POST api/video/all
// @desc    fetch all videos from db
// @access  public
router.get("/all", (req, res) => {
  Video.find({})
    .populate("user", ["username"])
    .sort({ date: -1 })
    .then(list => res.json(list))
    .catch(err => console.log(err));
});

// @route   POST api/video/add
// @desc    check if video is new, then add it to the list
// @access  private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const youtubeEndpoint = "https://www.googleapis.com/youtube/v3/videos";
    const errors = {};

    const videoId = youtubeUrl.extractId(req.body.videoUrl);
    if (!videoId) {
      errors.video = "Invalid Url";
      return res.status(400).json(errors);
    }

    Video.findOne({ videoId })
      .then(video => {
        if (video) {
          errors.video = "Sorry, this video has already been posted";
          return res.status(400).json(errors);
        } else {
          axios
            .get(youtubeEndpoint, {
              params: {
                key: youtubeApiKey,
                id: videoId,
                part: "snippet"
              }
            })
            .then(video => {
              if (!video.data.items.length) {
                throw 404;
              }

              video = video.data.items[0].snippet;

              const newVideo = new Video({
                user: req.user.id,
                videoId,
                channel: video.channelId,
                title: video.title,
                thumbnail: video.thumbnails.medium.url
              });

              newVideo
                .save()
                .then(video => {
                  User.findById(req.user.id).then(user => {
                    user.uploads.push(video._id);
                    user.save().then(user => res.json(video));
                  });
                })
                .catch(err => {
                  console.log(err);
                  errors.video = "Database error";
                  return res.status(500).json(errors);
                });
            })
            .catch(err => {
              let status;
              if (typeof err === 'number') {
                status = err;
              } else {
                status = err.response.status
              }

              switch (status) {
                case 404:
                  errors.video = "This video doesn't exist";
                  break;
                default:
                  errors.video = "Could not connect to YouTube";
              }
              return res.status(status).json(errors);
            });
        }
      })
      .catch(err => console.log(err));
  }
);

// @route   POST api/video/like/:id
// @desc    like/unlike video
// @access  private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Video.findOne({ videoId: req.params.id })
      .then(video => {
        User.findById(req.user.id)
          .then(user => {
            if (String(video.user) === req.user.id) {
              errors.video = "Users cannot like/unlike their own videos";
              return res.status(400).json(errors);
            } else {
              // add/remove video to user's likes list,
              // and add/remove user to video's likes list
              Promise.all([toggleLike(video, user), toggleLike(user, video)])
                .then(() => {
                  return res.json(video);
                })
                .catch(err => {
                  console.log(err);
                  errors.video =
                    "Something went wrong when liking/unliking the video";
                  return res.status(400).json(errors);
                });
            }
          })
          .catch(err => {
            console.log(err);
            errors.video = "User not found";
            return res.status(404).json(errors);
          });
      })
      .catch(err => {
        console.log(err);
        errors.video = "Database fetch error";
        return res.status(404).json(errors);
      });
  }
);

async function toggleLike(obj1, obj2) {
  // check if obj2 is already included in likes list of obj1
  if (obj1.likes.filter(like => String(like) === String(obj2._id)).length) {
    // if that's true, it means it's an "unlike" action:
    // remove obj2 from likes list of obj1
    obj1 = removeSingleElement(obj1, obj2);
    addToUploadersCounter(obj1, false);
  } else {
    // otherwise it's a "like" action: add obj2 to likes list of obj1
    obj1.likes.push(obj2._id);
    addToUploadersCounter(obj1, true);
  }
  return await obj1.save();
}

// @route   DELETE api/video/delete/:id
// @desc    delete video
// @access  private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Video.findOne({ videoId: req.params.id })
      .then(video => {
        if (String(video.user) !== req.user.id) {
          errors.video = "You cannot delete other people's videos";
          return res.status(400).json(errors);
        } else {
          // find all users who liked this,
          // then remove video from their liked videos
          video.likes.forEach(userId => {
            User.findById(userId)
              .then(user => {
                user = removeSingleElement(user, video._id);
                user.save();
              })
              .catch(err => {
                console.log(err);
                errors.video = "User(s) not found";
                return res.status(404).json(errors);
              });
          });

          // remove video from uploader's list
          User.findById(req.user.id).then(uploader => {
            uploader.likesCount -= video.likes.length;
            uploader = removeSingleElement(uploader, video._id, "uploads");
            uploader.save();
          });

          // remove video from collection
          video.remove().then(() => {
            res.json({ success: true });
          });
        }
      })
      .catch(err => {
        console.log(err);
        errors.video = "Database fetch error";
        return res.status(404).json(errors);
      });
  }
);

function removeSingleElement(obj, id, list = "likes") {
  assert(list in obj);
  const idx = obj[list].map(elem => String(elem._id)).indexOf(String(id));
  obj[list].splice(idx, 1);
  return obj;
}

function addToUploadersCounter(obj, isBeingLiked) {
  if (obj instanceof Video) {
    User.findById(obj.user).then(uploader => {
      isBeingLiked ? uploader.likesCount++ : uploader.likesCount--;
      uploader.save();
    });
  }
}

module.exports = router;
