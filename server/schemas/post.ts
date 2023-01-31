import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  contents: {
    type: String,
    require: true,
  },
});

postSchema.set('toJSON', {
  virtuals: true,
});

postSchema.virtual('id').get(function () {
  // eslint-disable-next-line no-underscore-dangle
  return this._id.toHexString();
});

export const Post = mongoose.model('Post', postSchema);
