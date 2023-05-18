import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  user_id: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model('KakaoUser', userSchema);
