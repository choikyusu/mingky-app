import mongoose from 'mongoose';

const { Schema } = mongoose;

const roomSchema = new Schema({
  identifier: {
    type: String,
    require: true,
    unique: true,
  },
  type: {
    type: String,
    require: true,
  },
  lastChat: {
    type: String,
    require: String,
  },
  participantList: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'KakaoParticipant' },
  ],
  messageList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'KakaoMessage' }],
});
roomSchema.index({ identifier: 1 });

export const Room = mongoose.model('KakaoRoom', roomSchema);
