const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const commentSchema = mongoose.Schema({
  comment: {
    type: String,
    required: true,
  },
  Blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Blog',
  },
});

commentSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Comment', commentSchema);