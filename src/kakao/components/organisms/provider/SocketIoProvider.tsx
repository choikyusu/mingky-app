import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { SOCKET_HOST } from '../../../constants/env.constants';

type SocketIoProps = {
  socketIo: Socket<DefaultEventsMap, DefaultEventsMap>;
  setSocketIo: React.Dispatch<
    React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap>>
  >;
};

const SocketIoContext = createContext<SocketIoProps | null>(null);

export default function SocketIoProvider(props: { children: React.ReactNode }) {
  const { children } = props;

  const [socketIo, setSocketIo] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  useEffect(() => {
    setSocketIo(io(SOCKET_HOST));
    socketIo?.on('connect', () => {
      console.log('Socket 연결됨');
    });

    return () => {
      socketIo?.close();
    };
  }, []);

  const value = useMemo(
    () => ({
      socketIo,
      setSocketIo,
    }),
    [socketIo],
  );

  return (
    <SocketIoContext.Provider value={value}>
      {children}
    </SocketIoContext.Provider>
  );
}

export function useSocketIoProvider() {
  const state = useContext(SocketIoContext);
  if (!state) throw new Error('Cannot find SocketIoProvider');
  return state;
}
