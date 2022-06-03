const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: {
      //so we can see the password
      type: String,
      required: true,
    },
    categories: {
      type: Array, //we will push all the categories in the array like life Technology...
      required: false,
    },
  },
  { timestamps: true } //create update add
);

module.exports = mongoose.model("Post", PostSchema);
