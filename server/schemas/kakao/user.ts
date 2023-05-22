import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  user_id: {
    type: String,
    require: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nick_name: {
    type: String,
    required: true,
  },
  base_profile: {
    type: String,
    required: true,
  },
  base_background: {
    type: String,
  },
  message: {
    type: String,
  },
});

export const User = mongoose.model('KakaoUser', userSchema);
