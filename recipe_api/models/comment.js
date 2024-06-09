const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true
    },
  }, { timestamps: true });
  
  module.exports = mongoose.model('Comment', commentSchema);