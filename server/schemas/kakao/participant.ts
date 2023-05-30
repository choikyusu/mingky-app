import mongoose from 'mongoose';

const { Schema } = mongoose;

const participantSchema = new Schema({
  userObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'KakaoUser',
  },
  userId: {
    type: String,
    require: true,
  },
  identifier: {
    type: String,
    require: true,
  },
  roomName: {
    type: String,
  },
  newChat: {
    type: Number,
  },
  lastReadChatNo: {
    type: Number,
  },
  createdAt: { type: Date, default: Date.now },
});
participantSchema.index({ identifier: 1 });

export const Participant = mongoose.model(
  'KakaoParticipant',
  participantSchema,
);
