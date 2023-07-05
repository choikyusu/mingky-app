import { Message } from '../../schemas/kakao/message';
import { Participant } from '../../schemas/kakao/participant';

const getLastMessageAt = async (identifier: string) => {
  const lastMessage = await Message.findOne({ identifier }).sort('-index');
  return lastMessage;
};

const updateParticipantLastReadChatNo = async (
  identifier: string,
  userId: string,
  lastMessageIndex: number,
) => {
  await Participant.updateOne(
    {
      identifier,
      userId,
    },
    { lastReadChatNo: lastMessageIndex },
  );
};

const getParticipantWithPopulate = async (
  identifier: string,
  userId: string,
) => {
  const participant = await Participant.findOne({
    identifier,
    userId,
  })
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

  return participant;
};

const getParticipantMessages = async (identifier: string) => {
  const participantMessages = await Participant.find({ identifier }).select(
    'userId lastReadChatNo',
  );
  return participantMessages;
};

export {
  getLastMessageAt,
  updateParticipantLastReadChatNo,
  getParticipantWithPopulate,
  getParticipantMessages,
};
