import { Server, Socket } from 'socket.io';
import {
  getLastMessageAt,
  getParticipantMessages,
  getParticipantWithPopulate,
  updateParticipantLastReadChatNo,
} from './doQueries';

export const readMessage = (socket: Socket, io: Server) => {
  socket.on('readMessage', async (userId: string, identifier: string) => {
    const lastMessage = await getLastMessageAt(identifier);

    if (lastMessage) {
      await updateParticipantLastReadChatNo(
        identifier,
        userId,
        lastMessage.index,
      );

      const participant = await getParticipantWithPopulate(identifier, userId);
      const participantMessage = await getParticipantMessages(identifier);

      io.to(userId).emit('roomUpdate', participant);
      io.to(identifier).emit('lastReadMessage', participantMessage);
    }
  });
};
