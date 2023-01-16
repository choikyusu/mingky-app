import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  snsId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  gender: {
    type: String,
    require: true,
  },
  birthYear: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  accessToken: {
    type: String,
    require: true,
  },
  refreshToken: {
    type: String,
    require: true,
  },
});

export const User = mongoose.model('User', userSchema);
