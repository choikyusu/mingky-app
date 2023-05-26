import express from 'express';
import jwtToken, { TOKEN_EXPIRED } from '../../auth/kakao/jwtToken';
import { User } from '../../schemas/kakao/user';
import { Room } from '../../schemas/kakao/room';
import { Participant } from '../../schemas/kakao/participant';
import { Types } from 'mongoose';

const router = express.Router();

router.post('/room/create', async (req, res) => {
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

  if (
    req.headers.authorization &&
    typeof req.headers.authorization === 'string'
  ) {
    const token = req.headers.authorization.split('Bearer ')[1];
    const result = jwtToken.verify(token);
    if (result.ok && result.userId) {
      const user = await User.findOne({ userId: result.userId });
      const room = await Room.findOne({ identifier: roomInfo.identifier });
      if (user) {
        if (!room) {
          const participantIdList = roomInfo.participantList.map(
            async userId => {
              const user = await User.findOne({ userId });
              if (user) {
                const participant = await Participant.create({
                  identifier: roomInfo.identifier,
                  lastReadChatNo: 0,
                  newChat: 0,
                  roomName: '',
                  userObjectId: user._id,
                  userId: user.userId,
                });

                return participant._id;
              }
              return undefined;
            },
          );

          const result = (await Promise.all(participantIdList)).filter(
            participantId => participantId !== undefined,
          ) as Types.ObjectId[];

          await Room.create({
            identifier: roomInfo.identifier,
            lastChat: '',
            messageList: [],
            participantList: result,
          });
        }

        const createdRoom = await Room.findOne({
          identifier: roomInfo.identifier,
        }).populate('participantList');

        return res.json({ data: { room: createdRoom } });
      }

      return res.status(404).json({ msg: 'user not exist' });
    }
    if (!result.ok && result.error === TOKEN_EXPIRED) {
      return res.status(401).json({ msg: 'token_expired' });
    }
  }
  return res.status(400).json({ msg: 'cannot find token' });
});

export default router;
