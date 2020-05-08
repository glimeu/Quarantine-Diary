import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const CommentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentId: {
    type: Number,
    required: false,
    default: 0,
  },
}, {
  timestamps: true,
});

CommentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Comments', CommentSchema);
