import mongoose from 'mongoose';

const { Schema } = mongoose;

const eventSchema = new Schema({
  category: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  nameText: {
    type: String,
    require: true,
  },
  startDate: {
    type: String,
    require: true,
  },
  endDate: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  summary: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  done: {
    type: Boolean,
    require: true,
  },
  bold: {
    type: Boolean,
    require: true,
  },
  hidden: {
    type: Boolean,
    require: true,
  },
  check: {
    type: Boolean,
    require: true,
  },
});

eventSchema.set('toJSON', {
  virtuals: true,
});

eventSchema.virtual('id').get(function () {
  /* eslint no-underscore-dangle: 0 */
  return this._id.toHexString();
});

export const Event = mongoose.model('Event', eventSchema);
