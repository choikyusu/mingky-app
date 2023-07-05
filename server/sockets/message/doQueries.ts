import { Types } from 'mongoose';
import { Message } from '../../schemas/kakao/message';
import { Participant } from '../../schemas/kakao/participant';
import { Room } from '../../schemas/kakao/room';

const getLastMessageAt = async (identifier: string) => {
  return Message.findOne({ identifier }).sort('-index');
};

const createMessage = async (messageObj: any, index: number) => {
  const createdMessage = await Message.create({
    identifier: messageObj.identifier,
    index,
    sendUserId: messageObj.sendUserId,
    message: messageObj.message,
    notRead: 0,
  });

  return createdMessage;
};

const updateRoomLastMessage = async (
  identifier: string,
  messageId: Types.ObjectId,
) => {
  await Room.updateOne({ identifier }, { lastMessageObjectId: messageId });
};

const updateParticipantLastReadChatNo = async (
  identifier: string,
  userId: string,
  index: number,
) => {
  await Participant.updateOne(
    { identifier, userId },
    { lastReadChatNo: index },
  );
};

const getParticipantListWithPopulate = async (identifier: string) => {
  const participantList = await Participant.find({ identifier })
    .select('roomName newChat lastReadChatNo userId')
    .populate({
      path: 'roomObjectId',
      select: 'roomObjectId',
      populate: {
        path: 'participantList',
        select: 'userObjectId userId lastReadChatNo',
        populate: {
          path: 'userObjectId',
          select: 'profileUrl userId nickName name backgroundUrl',
        },
      },
    })
    .populate({
      path: 'roomObjectId',
      select: 'type lastMessageObjectId',
      populate: {
        path: 'lastMessageObjectId',
        select: 'sendUserId message notRead createdAt index',
      },
    });

  return participantList;
};

export {
  getLastMessageAt,
  createMessage,
  updateRoomLastMessage,
  updateParticipantLastReadChatNo,
  getParticipantListWithPopulate,
};
