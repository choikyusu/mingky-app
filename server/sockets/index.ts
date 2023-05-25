import * as http from 'http';
import { Server, Socket } from 'socket.io';

const runSocketIo = (server: http.Server) => {
  const io = new Server(server);

  io.on('connection', socket => {
    disconnect(socket);
    joinRoom(socket);
  });
};

const disconnect = (socket: Socket) => {
  socket.on('disconnect', () => {
    console.log('소켓 연결 해제');
  });
};

const joinRoom = (socket: Socket) => {
  socket.on('join', (roomId: string) => {
    socket.join(roomId);
    console.log(`${roomId}에 들어감`);
  });
};

export default runSocketIo;
