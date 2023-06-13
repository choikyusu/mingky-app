import express from 'express';
import { User } from '../../schemas/kakao/user';
import { Room } from '../../schemas/kakao/room';
import { Message } from '../../schemas/kakao/message';
import { Participant } from '../../schemas/kakao/participant';
import { Types } from 'mongoose';
import { createRoom } from '../../../src/services/apis/chat.api.service';

const router = express.Router();

router.post('/room/create', async (req: any, res) => {
  const {
    roomInfo,
  }: {
    roomInfo: {
      type: 'Individual' | 'Group' | 'OneToOne';
      identifier: string;
      roomName: string;
      participantList: string[];
    };
  } = req.body;
  const { userId } = req;

  const user = await User.findOne({ userId });
  const room = await Room.findOne({ identifier: roomInfo.identifier });
  if (user) {
    if (!room) {
      const createdRoom = await Room.create({
        identifier: roomInfo.identifier,
        type: roomInfo.type,
        messageList: [],
        participantList: [],
      });

      const participantIdList = roomInfo.participantList.map(async userId => {
        const user = await User.findOne({ userId });
        if (user) {
          const participant = await Participant.create({
            identifier: roomInfo.identifier,
            lastReadChatNo: 0,
            newChat: 0,
            roomName: roomInfo.roomName,
            userObjectId: user._id,
            userId: user.userId,
            roomObjectId: createdRoom._id,
          });

          return participant._id;
        }
        return undefined;
      });

      const participantResult = (await Promise.all(participantIdList)).filter(
        participantId => participantId !== undefined,
      ) as Types.ObjectId[];

      createdRoom.participantList = participantResult;
      await createdRoom.save();
    }

    const createdRoom = await Room.findOne({
      identifier: roomInfo.identifier,
    }).populate({
      path: 'participantList',
      select: 'userId',
    });

    const myRoomInfo = await Participant.findOne({
      identifier: roomInfo.identifier,
      userId,
    });

    return res.json({
      data: {
        identifier: createdRoom?.identifier || '',
        type: createdRoom?.type || '',
        roomName: myRoomInfo?.roomName || '',
        participantList: createdRoom?.participantList,
      },
    });
  }

  return res.status(404).json({ msg: 'user not exist' });
});

router.get('/room/message', async (req: any, res) => {
  const identifier = req.query.identifier as string;
  const { userId } = req;

  const user = await User.findOne({ userId }).select(
    'userId name nickName message profileUrl backgroundUrl friendList',
  );

  if (user) {
    const messageList = await Message.find({ identifier }).sort('index');
    return res.json({
      data: messageList,
    });
  }

  return res.status(500).json({ msg: '사용자 정보를 찾지 못했습니다.' });
});

router.get('/rooms', async (req: any, res) => {
  const { userId } = req;

  const participantList = await Participant.find({ userId })
    .select('roomName newChat lastReadChatNo')
    .populate({
      path: 'roomObjectId',
      select: 'type',
    })
    .populate({
      path: 'roomObjectId',
      select: 'roomObjectId',
      populate: {
        path: 'participantList',
        select: 'userObjectId userId',
        populate: {
          path: 'userObjectId',
          select: 'profileUrl userId nickName name backgroundUrl',
        },
        match: { userId: { $ne: userId } },
      },
    })
    .populate({
      path: 'roomObjectId',
      select: 'lastMessageObjectId',
      populate: {
        path: 'lastMessageObjectId',
        select: 'sendUserId message notRead createdAt index',
      },
    });
  if (participantList) {
    return res.json({
      data: participantList,
    });
  }

  return res.status(500).json({ msg: '사용자 정보를 찾지 못했습니다.' });
});

export default router;
