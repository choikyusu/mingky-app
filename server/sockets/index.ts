import * as http from 'http';
import { Server, Socket } from 'socket.io';

const runSocketIo = (server: http.Server) => {
  const io = new Server(server);

  io.on('connection', socket => {
    disconnect(socket);
    joinRoom(socket);
    message(socket, io);
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

const message = (socket: Socket, io: Server) => {
  socket.on('message', async (messageObj: any) => {
    console.log('message', messageObj);
  });
};

export default runSocketIo;
