import * as React from 'react';
import { useState } from 'react';

import { Message } from '../models/message';
import { Room } from '../models/room';

type AppContexProps = {
  board: string[];
  username: string;
  messages: Message[];
  roomId: string;
  rooms: Room[];
  player: string;
  updateBoard: (board: string[]) => void;
  saveUsername: (username: string) => void;
  updateMessages: (message: Message[]) => void;
  saveRoomId: (roomId: string) => void;
  updateRooms: (rooms: Room[]) => void;
  updatePlayer: (player: string) => void;
};

export const AppContext = React.createContext<AppContexProps>(
  {} as AppContexProps
);

type ProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(null));
  const [username, setUserName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [roomId, setRoomId] = useState('');
  const [rooms, setRooms] = useState<Room[]>([]);
  const [player, setPlayer] = useState('X');

  const updateBoard = (board: string[]) => {
    setBoard(board);
  };
  const saveUsername = (username: string) => {
    setUserName(username);
  };
  const saveRoomId = (roomId: string) => setRoomId(roomId);
  const updateMessages = (messages: Message[]) => {
    setMessages(messages);
  };

  const updatePlayer = (player: string) => setPlayer(player);

  const updateRooms = (rooms: Room[]) => setRooms(rooms);

  return (
    <AppContext.Provider
      value={{
        board,
        username,
        roomId,
        messages,
        rooms,
        player,
        updateBoard,
        saveUsername,
        saveRoomId,
        updateMessages,
        updateRooms,
        updatePlayer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
