const mongoose = require("mongoose");

//we gonna import mongoose again
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      //unique true for no one can create a user with same username
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    //we added a profiele picture for each user
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
  /*Mongoose schemas support a timestamps option. If you set timestamps: true, Mongoose will add two properties of type Date to your schema:
createdAt: a date representing when this document was created
updatedAt: a date representing when this document was last updated   src(https://mongoosejs.com/docs/timestamps.html)*/
);
module.exports = mongoose.model("User", UserSchema); //we exported schema
