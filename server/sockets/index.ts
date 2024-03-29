import * as http from 'http';
import { Server, Socket } from 'socket.io';
import { joinRoom } from './joinRoom/joinRoom';
import { readMessage } from './readMessage/readMessage';
import { message } from './message/message';
import { logger } from '../logger/logger';

const runSocketIo = (server: http.Server) => {
  const io = new Server(server);

  io.on('connection', socket => {
    disconnect(socket);
    joinRoom(socket, io);
    readMessage(socket, io);
    message(socket, io);
    roomUpdateListner(socket);
  });
};

const disconnect = (socket: Socket) => {
  socket.on('disconnect', () => {
    logger.info('소켓 연결 해제');
  });
};

const roomUpdateListner = (socket: Socket) => {
  socket.on('roomUpdate', (userId: string) => {
    socket.join(userId);
    logger.info(`${userId}가 접속했습니다.`);
  });
};

export default runSocketIo;
