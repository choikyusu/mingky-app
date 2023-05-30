import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
  identifier: {
    type: String,
    require: true,
  },
  index: {
    type: Number,
    required: true,
  },
  sendUserId: {
    type: String,
  },
  message: {
    type: String,
    require: true,
  },
  notRead: {
    type: Number,
    require: true,
  },
  createdAt: { type: Date, default: Date.now },
});
messageSchema.index({ identifier: 1 });

export const Message = mongoose.model('KakaoMessage', messageSchema);
