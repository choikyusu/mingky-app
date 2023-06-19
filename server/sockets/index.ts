import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { Message } from '../schemas/kakao/message';
import { Room } from '../schemas/kakao/room';
import { Participant } from '../schemas/kakao/participant';

const runSocketIo = (server: http.Server) => {
  const io = new Server(server);

  io.on('connection', socket => {
    disconnect(socket);
    joinRoom(socket);
    message(socket, io);
    roomUpdateListner(socket);
  });
};

const disconnect = (socket: Socket) => {
  socket.on('disconnect', () => {
    console.log('소켓 연결 해제');
  });
};

const roomUpdateListner = (socket: Socket) => {
  socket.on('roomUpdate', (userId: string) => {
    socket.join(userId);
    console.log(`${userId}가 접속했습니다.`);
  });
};

const joinRoom = (socket: Socket) => {
  socket.on('join', (identifier: string) => {
    socket.join(identifier);
    console.log(`${identifier}에 들어감`);
  });
};

const message = (socket: Socket, io: Server) => {
  socket.on(
    'message',
    async (messageObj: {
      identifier: string;
      type: string;
      participant: any[];
      sendUserId: string;
      message: string;
      notRead: number;
    }) => {
      let index = 1;
      const lastMessage = await Message.findOne({
        identifier: messageObj.identifier,
      }).sort('-index');
      if (lastMessage) index = lastMessage.index + 1;
      const addedMessage = await Message.create({
        identifier: messageObj.identifier,
        index,
        sendUserId: messageObj.sendUserId,
        message: messageObj.message,
        notRead: 0,
      });
      await Room.updateOne(
        { identifier: messageObj.identifier },
        { lastMessageObjectId: addedMessage._id },
      );

      const participantList = await Participant.find({
        identifier: messageObj.identifier,
      })
        .select('roomName newChat lastReadChatNo userId')
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

      io.to(messageObj.identifier).emit('message', addedMessage);

      participantList.forEach(participant => {
        if (participant && participant.userId) {
          io.to(participant.userId).emit('roomUpdate', participant);
        }
      });
    },
  );
};

export default runSocketIo;
