import { Server, Socket } from 'socket.io';
import {
  createMessage,
  getLastMessageAt,
  getParticipantListWithPopulate,
  updateParticipantLastReadChatNo,
  updateRoomLastMessage,
} from './doQueries';

export const message = (socket: Socket, io: Server) => {
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
      const lastMessage = await getLastMessageAt(messageObj.identifier);
      if (lastMessage) index = lastMessage.index + 1;
      const addedMessage = await createMessage(messageObj, index);
      await updateRoomLastMessage(messageObj.identifier, addedMessage._id);

      await updateParticipantLastReadChatNo(
        messageObj.identifier,
        messageObj.sendUserId,
        index,
      );

      const participantList = await getParticipantListWithPopulate(
        messageObj.identifier,
      );

      io.to(messageObj.identifier).emit('message', addedMessage);

      participantList.forEach(participant => {
        if (participant && participant.userId) {
          io.to(participant.userId).emit('roomUpdate', participant);
        }
      });
    },
  );
};
