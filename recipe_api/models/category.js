const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
 
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: [String]
  },
  photo_url: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
