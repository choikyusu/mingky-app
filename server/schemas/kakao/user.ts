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
});

export const User = mongoose.model('KakaoUser', userSchema);
