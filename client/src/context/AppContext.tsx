import * as React from 'react';
import { useState } from 'react';
import { Message } from '../models/message';

type AppContexProps = {
  board: string[];
  username: string;
  messages: Message[];
  roomId: string;
  updateBoard: (board: string[]) => void;
  saveUsername: (username: string) => void;
  updateMessages: (message: Message[]) => void;
  saveRoomId: (roomId: string) => void;
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

  return (
    <AppContext.Provider
      value={{
        board,
        username,
        roomId,
        messages,
        updateBoard,
        saveUsername,
        saveRoomId,
        updateMessages,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export default AppProvider;
