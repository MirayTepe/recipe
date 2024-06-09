const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
      type: String,
      required: true
    },
    fullName: {
      type: String
    },
    dateOfBirth: {
      type: Date
    },
    profilePicture: {
      type: String,
      default: 'default_profile_picture_url'
    },
    likedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    createdRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }]
  }, { timestamps: true });
  
  module.exports = mongoose.model('User', userSchema);