
/**
 * Use mongoose to set up a Post model
 */
const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true},
  content: { type: String, required: true}
});

module.exports = mongoose.model('Post', postSchema);
