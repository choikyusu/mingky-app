import mongoose from 'mongoose';

const { Schema } = mongoose;

const friendSchema = new Schema({
  user_id: {
    type: String,
    require: true,
  },
  friend_list: {
    type: Array,
    required: true,
  },
});

export const Friend = mongoose.model('KakaoFriend', friendSchema);
