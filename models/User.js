const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  // list of videos this user uploaded
  uploads: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos"
    }
  ],
  // list of videos this user liked
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "videos"
    }
  ],
  likesCount: {
    type: Number,
    required: true
  },
  social: {
    youtube: {
      type: String
    },
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    website: {
      type: String
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema, "users");
