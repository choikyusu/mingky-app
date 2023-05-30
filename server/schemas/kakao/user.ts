import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: {
    type: String,
    require: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
    trim: true,
  },
  salt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  nickName: {
    type: String,
    required: true,
  },
  profileUrl: {
    type: String,
  },
  backgroundUrl: {
    type: String,
  },
  message: {
    type: String,
  },
  friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KakaoUser' }],
  createdAt: { type: Date, default: Date.now },
});
userSchema.index({ userId: 1 });

export const User = mongoose.model('KakaoUser', userSchema);
