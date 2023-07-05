import { Server, Socket } from 'socket.io';
import {
  findParticipantInRoom,
  getLastMessageAt,
  getParticipantMessages,
  updateParticipant,
} from './doQueries';

export const joinRoom = (socket: Socket, io: Server) => {
  socket.on('join', async (userId: string, identifier: string) => {
    socket.join(identifier);

    const lastMessage = await getLastMessageAt(identifier);

    if (lastMessage) {
      await updateParticipant(identifier, userId, lastMessage.index);

      const participant = await findParticipantInRoom(identifier, userId);
      const participantMessage = await getParticipantMessages(identifier);

      io.to(userId).emit('roomUpdate', participant);
      io.to(identifier).emit('lastReadMessage', participantMessage);
    }

    console.log(`${identifier}에 들어감`);
  });
};
