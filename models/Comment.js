const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  product_name: {
    type: String,
    match: /^.{1,200}$/
  },
  author: {
    type: String,
    match: /^.{1,200}$/
  },
  comment: String,
});

module.exports = mongoose.model('Comment', CommentSchema);