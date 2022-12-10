import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { v4 as uuid } from 'uuid';
import AvailableRooms from './components/AvailableRooms/Index';
import Board from './components/Board/Index';
import Chat from './components/Chat/Index';
import { AppContainer } from './components/styles';

const App: React.FC = () => {
  const socket = io('http://localhost:3001');
  useEffect(() => {
    return () => {
      localStorage.setItem('clientId', uuid());
    };
  }, []);

  return (
    <AppContainer>
      <AvailableRooms socket={socket} />
      <Board socket={socket} />
      <Chat socket={socket} />
    </AppContainer>
  );
};

export default App;
